"use client";
import {useEffect,useRef} from 'react';
export function useDepthPointer(amount=10){
 const ref=useRef<HTMLDivElement>(null);const frame=useRef<number|null>(null);
 function reset(){if(frame.current!==null)cancelAnimationFrame(frame.current);frame.current=null;ref.current?.style.setProperty('--tilt-x','0deg');ref.current?.style.setProperty('--tilt-y','0deg');}
 function onPointerMove(e:React.PointerEvent<HTMLElement>){if(e.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const box=e.currentTarget.getBoundingClientRect();const x=(e.clientX-box.left)/box.width-.5;const y=(e.clientY-box.top)/box.height-.5;if(frame.current!==null)cancelAnimationFrame(frame.current);frame.current=requestAnimationFrame(()=>{ref.current?.style.setProperty('--tilt-x',`${-y*amount}deg`);ref.current?.style.setProperty('--tilt-y',`${x*amount}deg`);frame.current=null;});}
 useEffect(()=>()=>{if(frame.current!==null)cancelAnimationFrame(frame.current);},[]);
 return {ref,onPointerMove,onPointerLeave:reset,onBlur:reset};
}
