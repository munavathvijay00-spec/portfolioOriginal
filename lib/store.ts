import { env } from "cloudflare:workers";
import {upgradePortfolio,contentVersion} from "./content-upgrade";
import { seed } from "./seed";
import type { Portfolio } from "./validation";
export function database() { if(!env.DB) throw new Error("Portfolio database unavailable"); return env.DB; }
export function bucket() { if(!env.BUCKET) throw new Error("Photo storage unavailable"); return env.BUCKET; }
export type Snapshot = {data:Portfolio,revision:number,updatedAt:string};
export async function readPortfolio(): Promise<Snapshot> {
 const db=database();
 await db.prepare("INSERT OR IGNORE INTO portfolio (id,content,revision,updated_at) VALUES (1,?,1,?)").bind(JSON.stringify(seed),new Date().toISOString()).run();
 // Apply the requested additions once, using a compare-and-swap to preserve edits.
 for(let attempt=0;attempt<3;attempt++) {
 const row=await db.prepare("SELECT content,revision,updated_at,content_version FROM portfolio WHERE id=1").first<{content:string,revision:number,updated_at:string,content_version:number}>();
 if(!row)throw new Error("Portfolio unavailable");
 const data:Portfolio=JSON.parse(row.content);
 if(row.content_version>=contentVersion)return {data,revision:row.revision,updatedAt:row.updated_at};
 const next=upgradePortfolio(data,row.content_version);const now=new Date().toISOString();
 const changed=await db.prepare("UPDATE portfolio SET content=?,content_version=?,revision=revision+1,updated_at=? WHERE id=1 AND revision=? AND content_version<?").bind(JSON.stringify(next),contentVersion,now,row.revision,contentVersion).run();
 if(changed.meta.changes)return {data:next,revision:row.revision+1,updatedAt:now};
 }
 throw new Error("Portfolio update is busy. Retry in a moment.");
}
export async function savePortfolio(data:Portfolio,revision:number,userId:string):Promise<Snapshot | null> {
 const now=new Date().toISOString();
 const result=await database().prepare("UPDATE portfolio SET content=?,revision=revision+1,updated_at=?,updated_by=? WHERE id=1 AND revision=?").bind(JSON.stringify(data),now,userId,revision).run();
 return result.meta.changes ? {data,revision:revision+1,updatedAt:now} : null;
}
