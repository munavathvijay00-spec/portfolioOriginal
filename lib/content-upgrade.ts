import type {Portfolio} from './validation';
import {featuredProjects} from './featured-projects';
// User-requested profile additions. Keep unrelated portfolio content and assets intact.
export const contentVersion=3;
export function upgradePortfolio(current:Portfolio, fromVersion=1):Portfolio {
 const additions=[
  {
    "id": "resume-1",
    "name": "C",
    "category": "Languages",
    "visible": true
  },
  {
    "id": "resume-2",
    "name": "C++",
    "category": "Languages",
    "visible": true
  },
  {
    "id": "resume-3",
    "name": "Go",
    "category": "Languages",
    "visible": true
  },
  {
    "id": "resume-4",
    "name": "Java",
    "category": "Languages",
    "visible": true
  },
  {
    "id": "resume-5",
    "name": "JavaScript",
    "category": "Languages",
    "visible": true
  },
  {
    "id": "resume-6",
    "name": "TypeScript",
    "category": "Languages",
    "visible": true
  },
  {
    "id": "resume-7",
    "name": "Rust",
    "category": "Languages",
    "visible": true
  },
  {
    "id": "resume-8",
    "name": "Python",
    "category": "Languages",
    "visible": true
  },
  {
    "id": "resume-9",
    "name": "OpenAI",
    "category": "AI/ML Tools",
    "visible": true
  },
  {
    "id": "resume-10",
    "name": "Gemini",
    "category": "AI/ML Tools",
    "visible": true
  },
  {
    "id": "resume-11",
    "name": "LangChain",
    "category": "AI/ML Tools",
    "visible": true
  },
  {
    "id": "resume-12",
    "name": "TensorFlow",
    "category": "AI/ML Tools",
    "visible": true
  },
  {
    "id": "resume-13",
    "name": "AI Agents",
    "category": "AI/ML Tools",
    "visible": true
  },
  {
    "id": "resume-14",
    "name": "MCPs",
    "category": "AI/ML Tools",
    "visible": true
  },
  {
    "id": "resume-15",
    "name": "CrewAI",
    "category": "AI/ML Tools",
    "visible": true
  },
  {
    "id": "resume-16",
    "name": "HTML5",
    "category": "Frontend",
    "visible": true
  },
  {
    "id": "resume-17",
    "name": "React",
    "category": "Frontend",
    "visible": true
  },
  {
    "id": "resume-18",
    "name": "Next.js",
    "category": "Frontend",
    "visible": true
  },
  {
    "id": "resume-19",
    "name": "TailwindCSS",
    "category": "Frontend",
    "visible": true
  },
  {
    "id": "resume-20",
    "name": "Three.js",
    "category": "Frontend",
    "visible": true
  },
  {
    "id": "resume-21",
    "name": "Framer Motion",
    "category": "Frontend",
    "visible": true
  },
  {
    "id": "resume-22",
    "name": "Node.js",
    "category": "Backend",
    "visible": true
  },
  {
    "id": "resume-23",
    "name": "Express.js",
    "category": "Backend",
    "visible": true
  },
  {
    "id": "resume-24",
    "name": "FastAPI",
    "category": "Backend",
    "visible": true
  },
  {
    "id": "resume-25",
    "name": "Postman",
    "category": "Backend",
    "visible": true
  },
  {
    "id": "resume-26",
    "name": "OpenCV",
    "category": "Backend",
    "visible": true
  },
  {
    "id": "resume-27",
    "name": "PostgreSQL",
    "category": "Backend",
    "visible": true
  },
  {
    "id": "resume-28",
    "name": "MongoDB",
    "category": "Backend",
    "visible": true
  },
  {
    "id": "resume-29",
    "name": "AWS",
    "category": "Cloud/DevOps",
    "visible": true
  },
  {
    "id": "resume-30",
    "name": "Azure",
    "category": "Cloud/DevOps",
    "visible": true
  },
  {
    "id": "resume-31",
    "name": "Google Cloud",
    "category": "Cloud/DevOps",
    "visible": true
  },
  {
    "id": "resume-32",
    "name": "Docker",
    "category": "Cloud/DevOps",
    "visible": true
  },
  {
    "id": "resume-33",
    "name": "Vercel",
    "category": "Cloud/DevOps",
    "visible": true
  },
  {
    "id": "resume-34",
    "name": "Supabase",
    "category": "Cloud/DevOps",
    "visible": true
  },
  {
    "id": "resume-35",
    "name": "Solidity",
    "category": "Blockchain",
    "visible": true
  },
  {
    "id": "resume-36",
    "name": "Web3.js",
    "category": "Blockchain",
    "visible": true
  },
  {
    "id": "resume-37",
    "name": "Ether.js",
    "category": "Blockchain",
    "visible": true
  },
  {
    "id": "resume-38",
    "name": "Finance knowledge",
    "category": "Finance",
    "visible": true
  }
];
 additions.push(
 {id:'resume-numpy',name:'NumPy',category:'AI/ML Tools',visible:true},
 {id:'resume-pandas',name:'Pandas',category:'AI/ML Tools',visible:true},
 {id:'resume-scikit-learn',name:'scikit-learn',category:'AI/ML Tools',visible:true},
 {id:'resume-matplotlib',name:'Matplotlib',category:'AI/ML Tools',visible:true},
 {id:'resume-smart-contracts',name:'Smart Contracts',category:'Blockchain',visible:true}
 );
 const next=structuredClone(current);
 if(fromVersion<2){
 next.profile.role='Full Stack & Blockchain Developer';
 next.profile.resumeLink='/resume.pdf';
 next.profile.headline='I build secure tokenization engines and dynamic dashboards, with strong finance knowledge and expert use of AI tools.';
 const addition='I’m also a blockchain developer with a strong understanding of finance and expertise in using AI tools.';
 if(!next.profile.bio.includes(addition))next.profile.bio=`${next.profile.bio.trim()} ${addition}`.trim();
 const normalize=(name:string)=>name.toLowerCase().replace(/\s/g,'');
 for(const skill of additions){const existing=next.skills.find(s=>normalize(s.name)===normalize(skill.name));if(existing){existing.name=skill.name;existing.category=skill.category;}else next.skills.push(skill);}
 }
 // Preserve prior records in the editor; feature only the three reviewed projects.
 next.projects.forEach(p=>{p.visible=false;});
 for(const project of featuredProjects){const index=next.projects.findIndex(p=>p.id===project.id);if(index<0)next.projects.push(structuredClone(project));else next.projects[index]=structuredClone(project);}
 return next;
}
