import {env} from 'cloudflare:workers';
import {database,readPortfolio} from './store';
import {emailConfigured,notificationPayload,sendNotification,type EmailPayload,type NotificationStatus} from './email';
import {HttpError} from './http';
export type StoredMessage={id:string,name:string,email:string,message:string,created_at:string,notification_status:NotificationStatus,notification_error:string|null,notification_payload:string|null,notification_started_at:string|null,notification_updated_at:string|null,provider_id:string|null};
export async function notifyMessage(id:string):Promise<NotificationStatus>{
 const db=database();let row=await db.prepare('SELECT * FROM messages WHERE id=?').bind(id).first<StoredMessage>();
 if(!row)throw new HttpError(404,'Message not found.');
 if(row.notification_status==='sent')return 'sent';
 if(!emailConfigured(env.RESEND_API_KEY,env.PORTFOLIO_EMAIL_FROM))return 'not_configured';
 const now=new Date().toISOString();const leaseCutoff=new Date(Date.now()-60000).toISOString();
 if(row.notification_status==='sending'&&row.notification_updated_at&&row.notification_updated_at>leaseCutoff)return 'sending';
 // A timeout might have reached the provider. Its duplicate suppression window is 24 hours.
 if(['sending','unknown'].includes(row.notification_status)&&row.notification_started_at&&Date.now()-Date.parse(row.notification_started_at)>23*3600000)throw new HttpError(409,'Delivery is unconfirmed. Check the email provider before attempting another notification.');
 let payload:EmailPayload;
 if(row.notification_payload)payload=JSON.parse(row.notification_payload);else{
  const {data}=await readPortfolio();payload=notificationPayload(env.PORTFOLIO_EMAIL_FROM!,data.contactInfo.email,row);
 }
 const claimed=await db.prepare("UPDATE messages SET notification_status='sending',notification_error=NULL,notification_payload=?,notification_started_at=COALESCE(notification_started_at,?),notification_updated_at=? WHERE id=? AND notification_status!='sent' AND (notification_status!='sending' OR notification_updated_at IS NULL OR notification_updated_at<=?)").bind(JSON.stringify(payload),now,now,id,leaseCutoff).run();
 if(!claimed.meta.changes){row=await db.prepare('SELECT * FROM messages WHERE id=?').bind(id).first<StoredMessage>();return row?.notification_status??'sending';}
 const result=await sendNotification(payload,env.RESEND_API_KEY!,id);
 await db.prepare('UPDATE messages SET notification_status=?,notification_error=?,provider_id=?,notification_updated_at=? WHERE id=?').bind(result.status,result.error??null,result.providerId??null,new Date().toISOString(),id).run();
 return result.status;
}
