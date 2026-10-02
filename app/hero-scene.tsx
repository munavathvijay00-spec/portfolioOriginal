"use client";
import {useState} from 'react';
import {Code2,Blocks,ChartNoAxesCombined,Pause,Play} from 'lucide-react';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {projectDomains} from '@/lib/featured-projects';
import type {Portfolio} from '@/lib/validation';
import {useDepthPointer} from './depth-interaction';
const icons=[Code2,Blocks,ChartNoAxesCombined];
export default function HeroScene({projects}:{projects:Portfolio['projects']}){
 const depth=useDepthPointer(14);const [active,setActive]=useState<string>(projectDomains[0].id);const [paused,setPaused]=useState(false);
 const index=projectDomains.findIndex(d=>d.id===active);const Icon=icons[index]??Code2;
 return <div {...depth} className={`hero-scene domain-scene${paused?' motion-paused':''}`} aria-label="Interactive three-dimensional project explorer">
  <div className="scene-topline"><span className="eyebrow">THREE DOMAINS. ONE BUILDER.</span><button className="motion-control" onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused?'Resume 3D motion':'Pause 3D motion'}>{paused?<Play size={15}/>:<Pause size={15}/>}<span>{paused?'Resume':'Pause'}</span></button></div>
  <Tabs value={active} onValueChange={setActive} orientation="vertical" className="domain-tabs">
   <div className="scene-perspective"><div className="scene-world">
    <div className="scene-halo" aria-hidden="true"/>
    <div className="cube-wrap" aria-hidden="true"><div className="code-cube"><div className="cube-face cube-front"><Icon/><span>{projectDomains[index]?.label}</span></div><div className="cube-face cube-back"><Code2/></div><div className="cube-face cube-right"><Blocks/></div><div className="cube-face cube-left"><ChartNoAxesCombined/></div><div className="cube-face cube-top"/><div className="cube-face cube-bottom"/></div></div>
    <TabsList className="domain-planes" aria-label="Explore project domains">{projectDomains.map((domain,i)=>{const DomainIcon=icons[i];return <TabsTrigger key={domain.id} value={domain.id} className={`stack-plane domain-plane domain-plane-${i}`}><span className="plane-icon"><DomainIcon size={22}/></span><span className="plane-text"><span className="plane-kicker">{domain.label}</span><strong>{domain.subtitle}</strong></span><span className="plane-end">{domain.code}</span></TabsTrigger>;})}</TabsList>
    <div className="scene-grid" aria-hidden="true"/>
   </div></div>
   <div className="domain-readout">{projectDomains.map(domain=>{const project=projects.find(p=>p.id===domain.id);return <TabsContent key={domain.id} value={domain.id} className="domain-result"><div><span className="eyebrow">{domain.label} / SELECTED PROJECT</span><strong>{project?.title??'Explore capabilities'}</strong></div><a href={project?`/projects/${encodeURIComponent(project.id)}`:'#skills'} className="domain-project-link">{project?'View project':'View skills'}</a><div className="domain-flow" aria-label="Project architecture">{domain.flow.map((step,i)=><span key={step}><small>0{i+1}</small>{step}</span>)}</div></TabsContent>;})}</div>
  </Tabs>
  <div className="scene-bottom"><span>SELECT A LAYER TO EXPLORE</span><span className="scene-line"/></div>
 </div>;
}
