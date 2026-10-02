import { readPortfolio, savePortfolio } from "@/lib/store";
import { adminIdentity, sameOrigin, jsonBody, failure, noStore, HttpError } from "@/lib/http";
import { portfolioSchema } from "@/lib/validation";
export const dynamic="force-dynamic";
export async function GET(){try{return Response.json(await readPortfolio(),{headers:noStore});}catch(e){return failure(e);}}
export async function PUT(request:Request){try{const user=await adminIdentity();sameOrigin(request);const body=await jsonBody(request);const parsed=portfolioSchema.safeParse(body.data);if(!parsed.success)throw new HttpError(400,parsed.error.issues.map(i=>`${i.path.join(".")}: ${i.message}`).slice(0,4).join("; "));if(!Number.isSafeInteger(body.revision)||body.revision<1)throw new HttpError(400,"Invalid content revision.");
 const current=await readPortfolio();if(parsed.data.profile.photo!==current.data.profile.photo)throw new HttpError(400,"Use the photo upload control to change your photo.");
 const result=await savePortfolio(parsed.data,body.revision,user.userId);if(!result)throw new HttpError(409,"Your portfolio changed in another tab. Reload the latest version before saving.");return Response.json(result,{headers:noStore});}catch(e){return failure(e);}}
