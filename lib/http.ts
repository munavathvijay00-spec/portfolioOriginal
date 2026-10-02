import { env } from "cloudflare:workers";
import { getChatGPTUser } from "@/app/chatgpt-auth";
export class HttpError extends Error { constructor(public status:number,message:string){super(message);} }
export const noStore={"Cache-Control":"no-store"};
// The Sites platform restricts this entire deployment to its owner. Identity checks
// also protect admin endpoints. Keep that owner-only policy for future deployments.
export async function adminIdentity(){ const user=await getChatGPTUser(); if(!user)throw new HttpError(401,"Sign in to edit your portfolio.");if(!env.PORTFOLIO_ADMIN_EMAIL || user.email.toLowerCase() !== env.PORTFOLIO_ADMIN_EMAIL.toLowerCase())throw new HttpError(403,"Only the portfolio owner can edit this content.");return user; }
export function sameOrigin(request:Request){ const origin=request.headers.get("origin"); if(!origin || origin!==new URL(request.url).origin)throw new HttpError(403,"This request must come from your portfolio."); }
export async function jsonBody(request:Request){const raw=await request.text();if(raw.length>150000)throw new HttpError(413,"Content is too large.");try{return JSON.parse(raw);}catch{throw new HttpError(400,"Invalid request data.");}}
export function failure(error:unknown){if(error instanceof HttpError)return Response.json({error:error.message},{status:error.status,headers:noStore});console.error("Portfolio request failed",error);return Response.json({error:"This service is temporarily unavailable. Your changes have not been saved. Please retry."},{status:503,headers:noStore});}
