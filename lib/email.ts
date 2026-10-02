import { z } from 'zod';
export type NotificationStatus='not_configured'|'sending'|'sent'|'failed'|'unknown';
export type EmailPayload={from:string,to:string[],reply_to:string,subject:string,text:string};
export type EmailResult={status:'sent'|'failed'|'unknown',providerId?:string,error?:string};
export function emailConfigured(key:unknown,sender:unknown){return typeof key==='string'&&!!key.trim()&&typeof sender==='string'&&z.string().email().safeParse(sender.trim()).success;}
export function notificationPayload(sender:string,recipient:string,message:{name:string,email:string,message:string}):EmailPayload{
 if(!z.string().email().safeParse(recipient).success)throw new Error('Invalid notification recipient');
 return {from:`Vijay Portfolio <${sender.trim()}>`,to:[recipient],reply_to:message.email,subject:'New message from Vijay’s portfolio',text:`A visitor sent a message through the portfolio contact form.\n\nName: ${message.name}\nEmail: ${message.email}\n\n${message.message}\n\nReply to this email to respond to the visitor.`};
}
// Plain text keeps visitor input out of markup and headers. Never return provider errors or secrets.
export async function sendNotification(payload:EmailPayload,key:string,id:string,transport:typeof fetch=fetch):Promise<EmailResult>{
 try{
  const response=await transport('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json','Idempotency-Key':`portfolio-contact/${id}`},body:JSON.stringify(payload),signal:AbortSignal.timeout(12000)});
  if(!response.ok)return {status:response.status>=500?'unknown':'failed',error:response.status===401||response.status===403?'Email sender authorization needs attention.':response.status===429?'Email provider rate limit reached. Retry later.':'Email provider did not accept this notification.'};
  const value=await response.json() as {id?:unknown};
  if(typeof value.id!=='string'||!value.id)return {status:'unknown',error:'Email provider response could not be confirmed.'};
  return {status:'sent',providerId:value.id};
 }catch{return {status:'unknown',error:'Email provider could not be reached. Delivery is unconfirmed.'};}
}
