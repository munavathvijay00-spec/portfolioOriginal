import { z } from "zod";
const short = z.string().trim().max(200);
const paragraph = z.string().trim().max(6000);
const link = z.string().trim().max(2048).refine(v => !v || /^https?:\/\//.test(v) && (() => { try { const u = new URL(v); return !u.username && !u.password; } catch {return false;} })(), "Use a complete http or https URL.");
const image = z.string().max(2048).nullable().refine(v => !v || /^\/projects\/[a-zA-Z0-9_.-]+$/.test(v) || /^\/api\/media\/[a-f0-9-]{36}$/.test(v), "Use an uploaded photo or a project image.");
const base = {id: z.string().min(1).max(80), visible: z.boolean()};
export const portfolioSchema = z.object({
 profile: z.object({ name: short.min(1), role: short.min(1), headline: short.min(1), bio: paragraph, photo: image, resumeLink: link.or(z.literal("/resume.pdf")), socials: z.object({github:link, linkedin:link, twitter:link}).strict() }).strict(),
 contactInfo: z.object({ email:z.string().trim().email().max(254), location:short, phone:z.string().trim().max(40).regex(/^[+0-9 ()-]*$/, "Enter a valid phone number.") }).strict(),
 projects:z.array(z.object({...base,title:short.min(1),description:paragraph,techStack:z.array(short.min(1)).max(30),githubLink:link,image,problem:paragraph,solution:paragraph,challenges:paragraph}).strict()).max(100),
 skills:z.array(z.object({...base,name:short.min(1),category:short.min(1)}).strict()).max(100),
 education:z.array(z.object({...base,institution:short.min(1),year:short,marks:short}).strict()).max(100),
 experience:z.array(z.object({...base,role:short.min(1),company:short.min(1),duration:short,description:paragraph}).strict()).max(100),
 achievements:z.array(z.object({...base,title:short.min(1),image}).strict()).max(100),
 devLog:z.array(z.object({...base,date:short,title:short.min(1),content:paragraph}).strict()).max(100)
}).strict().superRefine((v,ctx)=>{ for (const key of ['projects','skills','education','experience','achievements','devLog'] as const) {const ids=v[key].map(i=>i.id);if(new Set(ids).size!==ids.length)ctx.addIssue({code:'custom',message:'Duplicate record IDs.',path:[key]});}});
export type Portfolio = z.infer<typeof portfolioSchema>;
export const messageSchema = z.object({name:short.min(1), email:z.string().trim().email().max(254),message:z.string().trim().min(10).max(4000)}).strict();
