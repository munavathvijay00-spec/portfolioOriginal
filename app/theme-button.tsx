"use client";
import {useEffect,useState} from "react";
import {Sun,Moon} from "lucide-react";
export default function ThemeButton(){const [light,setLight]=useState(false);useEffect(()=>setLight(document.documentElement.dataset.theme==='light'),[]);function toggle(){const next=!light;setLight(next);document.documentElement.dataset.theme=next?'light':'dark';try{localStorage.setItem('vijay-theme',next?'light':'dark');}catch{}}return <button className="icon-button" onClick={toggle} aria-label={light?'Switch to dark mode':'Switch to light mode'} title={light?'Dark mode':'Light mode'}>{light?<Moon size={20}/>:<Sun size={20}/>}</button>;}
