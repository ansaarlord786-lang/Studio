import React, {useEffect, useRef} from 'react'
import {bundleProject} from '../lib/bundler'
export default function PreviewIframe({project, mode='static', isRunning, onConsoleMessage}){
  const iframeRef = useRef(null)
  useEffect(()=>{
    if(!isRunning) return
    (async ()=>{
      try{
        const out = await bundleProject(project, mode)
        const blob = new Blob([out],{type:'text/html'})
        const url = URL.createObjectURL(blob)
        iframeRef.current.src = url
      }catch(err){ onConsoleMessage?.(err.message) }
    })()
  },[project,mode,isRunning])
  return <iframe ref={iframeRef} title="preview" style={{width:'100%',height:'100%'}} sandbox="allow-scripts" />
}