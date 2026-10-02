import { requireChatGPTUser } from "../chatgpt-auth";
import {adminIdentity} from "@/lib/http";
import { readPortfolio } from "@/lib/store";
import AdminView from "./admin-view";
export const dynamic="force-dynamic";
export default async function Page(){const user=await requireChatGPTUser("/admin");try{await adminIdentity();return <AdminView initial={await readPortfolio()} user={user.displayName}/>;}catch(e){console.error(e);if((e as any).status===403)return <main id="main" className="unavailable"><h1>Owner access required</h1><p>Sign in with the account that owns this portfolio to edit it.</p><a href="/">View portfolio</a></main>;return <main id="main" className="unavailable"><h1>Editor temporarily unavailable</h1><p>Your portfolio data is safe. Please retry.</p><a href="/admin">Retry</a></main>;}}
