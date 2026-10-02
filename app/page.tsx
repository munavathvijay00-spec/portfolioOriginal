import { readPortfolio } from "@/lib/store";
import PortfolioView from "./portfolio-view";
export const dynamic="force-dynamic";
export default async function Page(){try{return <PortfolioView initial={await readPortfolio()}/>;}catch(e){console.error(e);return <main id="main" className="unavailable"><h1>Portfolio temporarily unavailable</h1><p>Please try again in a moment.</p><a href="/">Retry</a></main>;}}
