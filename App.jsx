import React, {useState, useEffect, useRef} from 'react'
import EditorPane from './components/EditorPane'
import FileTree from './components/FileTree'
import PreviewIframe from './components/PreviewIframe'
import ConsolePane from './components/ConsolePane'
import {loadProjectFromStorage, saveProjectToStorage, blankProject} from './lib/storage'

export default function App(){
  const [project, setProject] = useState(() => loadProjectFromStorage() || blankProject())
  const [activePath, setActivePath] = useState(Object.keys(project.files)[0] || 'index.html')
  const [mode, setMode] = useState('static')
  const [isRunning, setIsRunning] = useState(false)
  const consoleRef = useRef()

  useEffect(()=>{ saveProjectToStorage(project) },[project])

  return (
    <div className="app">
      <div className="left-pane">
        <div className="header">
          <button>New File</button>
          <button>Upload</button>
          <button>Download ZIP</button>
          <select value={mode} onChange={e=>setMode(e.target.value)}>
            <option value="static">Static</option>
            <option value="react">React</option>
          </select>
        </div>
        <FileTree project={project} setProject={setProject} setActivePath={setActivePath} />
        <div className="editor-area">
          <EditorPane filePath={activePath} project={project} setProject={setProject} onRun={()=>setIsRunning(true)} />
        </div>
      </div>

      <PreviewIframe project={project} mode={mode} isRunning={isRunning} onConsoleMessage={m=>consoleRef.current?.append(m)} />

      <div className="preview">
        <strong style={{padding:8,display:'block'}}>Console</strong>
        <ConsolePane ref={consoleRef} />
      </div>
    </div>
  )
}