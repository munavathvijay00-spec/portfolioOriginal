import {adminIdentity,sameOrigin,failure,noStore,HttpError} from '@/lib/http';
import {notifyMessage} from '@/lib/message-notifications';
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){try{sameOrigin(request);await adminIdentity();const {id}=await params;if(!/^[a-f0-9-]{36}$/.test(id))throw new HttpError(400,'Invalid message ID.');const status=await notifyMessage(id);return Response.json({emailNotification:status},{headers:noStore});}catch(e){return failure(e);}}
