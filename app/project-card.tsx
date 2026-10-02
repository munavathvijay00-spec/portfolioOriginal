"use client";
import {ExternalLink,Code2,Blocks,ChartNoAxesCombined} from 'lucide-react';
import {projectDomains} from '@/lib/featured-projects';
import type {Portfolio} from '@/lib/validation';
import {useDepthPointer} from './depth-interaction';
export default function ProjectCard({project,index}:{project:Portfolio['projects'][number],index:number}){
 const depth=useDepthPointer(8);const domain=projectDomains.find(d=>d.id===project.id);const Icon=project.id==='aegisdoc'?ChartNoAxesCombined:project.id==='blockchain-intelligence'?Blocks:Code2;
 return <div {...depth} className="project-depth"><a className="project-card" href={`/projects/${encodeURIComponent(project.id)}`}><div className={`project-image${project.image?'':' architecture-preview'}`}>{project.image?<img src={project.image} alt={`${project.title} project preview`} loading="lazy" width={720} height={450}/>:<div className="project-architecture"><Icon size={38} aria-hidden="true"/><span className="architecture-label">{domain?.label??'PROJECT'} ARCHITECTURE</span><div className="architecture-steps">{(domain?.flow??project.techStack.slice(0,3)).map((step,i)=><span key={step}><small>0{i+1}</small><strong>{step}</strong></span>)}</div><span className="architecture-footnote">{project.id==='aegisdoc'?'Browser-side document screening':'Explainable transaction analysis'}</span></div>}<span className="project-number">{String(index+1).padStart(2,'0')}</span></div><div className="project-copy">{domain&&<span className="project-domain">{domain.label}</span>}<div className="project-title"><h3>{project.title}</h3><ExternalLink size={20}/></div><p>{project.description}</p><div className="tags">{project.techStack.map(t=><span key={t}>{t}</span>)}</div><span className="case-link">Explore project</span></div></a></div>;
}
