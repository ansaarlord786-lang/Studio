import React, {useEffect, useRef} from 'react'
import * as monaco from 'monaco-editor'

export default function EditorPane({filePath, project, setProject, onRun}){
  const containerRef = useRef(null)
  const editorRef = useRef(null)

  useEffect(()=>{
    if(!containerRef.current) return
    editorRef.current = monaco.editor.create(containerRef.current, {
      value: project.files[filePath] || '',
      language: 'javascript',
      theme: 'vs-dark',
      minimap:{enabled:false}
    })

    const changeSub = editorRef.current.onDidChangeModelContent(()=>{
      const val = editorRef.current.getValue()
      setProject(p=>({...p, files:{...p.files,[filePath]:val}}))
    })

    return ()=>{
      changeSub.dispose()
      editorRef.current.dispose()
    }
  },[filePath])

  return <div style={{height:'100%'}}>
    <div style={{height:36,display:'flex',alignItems:'center',gap:8,paddingLeft:8}}>
      <strong>{filePath}</strong>
      <button onClick={onRun}>Run</button>
    </div>
    <div ref={containerRef} style={{height:'calc(100% - 36px)'}} />
  </div>
}