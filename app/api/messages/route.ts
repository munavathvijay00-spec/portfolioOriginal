import { database } from '@/lib/store';
import { adminIdentity, sameOrigin, jsonBody, failure, noStore, HttpError } from '@/lib/http';
import { messageSchema } from '@/lib/validation';
import {env} from 'cloudflare:workers';
import {emailConfigured} from '@/lib/email';
import {notifyMessage} from '@/lib/message-notifications';
export async function GET(){try{await adminIdentity();const result=await database().prepare('SELECT id,name,email,message,created_at,notification_status,notification_error,notification_updated_at FROM messages ORDER BY created_at DESC LIMIT 100').all();return Response.json(result.results,{headers:{...noStore,'X-Email-Notifications':emailConfigured(env.RESEND_API_KEY,env.PORTFOLIO_EMAIL_FROM)?'configured':'not_configured'}});}catch(e){return failure(e);}}
export async function POST(request:Request){try{
 sameOrigin(request);const parsed=messageSchema.safeParse(await jsonBody(request));
 if(!parsed.success)throw new HttpError(400,'Enter your name, a valid email and a message of 10–4000 characters.');
 const v=parsed.data;const db=database();const recent=await db.prepare('SELECT COUNT(*) AS total FROM messages WHERE email=? AND created_at>?').bind(v.email,new Date(Date.now()-60000).toISOString()).first<{total:number}>();
 if((recent?.total??0)>=3)throw new HttpError(429,'Please wait a minute before sending another message.');
 const id=crypto.randomUUID();await db.prepare('INSERT INTO messages (id,name,email,message,created_at) VALUES (?,?,?,?,?)').bind(id,v.name,v.email,v.message,new Date().toISOString()).run();
 let emailNotification='unknown';try{emailNotification=await notifyMessage(id);}catch{console.error('Contact notification could not be confirmed; message remains saved.');}
 return Response.json({saved:true,emailNotification},{status:201,headers:noStore});
}catch(e){return failure(e);}}
