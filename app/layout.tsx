import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Munavath Vijay · Full Stack & Blockchain Developer",description:"Full stack and blockchain development, finance knowledge and AI tools expertise. Explore Munavath Vijay’s selected projects and technical skills.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" data-theme="dark" suppressHydrationWarning><body><script dangerouslySetInnerHTML={{__html:`try{document.documentElement.dataset.theme=localStorage.getItem('vijay-theme')==='light'?'light':'dark'}catch{}`}}/><a className="skip" href="#main">Skip to content</a>{children}</body></html>}
