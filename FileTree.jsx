import React from 'react'
export default function FileTree({project,setProject,setActivePath}){
  const files = Object.keys(project.files||{})
  return <div className="file-tree">
    <ul style={{listStyle:'none',padding:8}}>
      {files.map(f=>(<li key={f} style={{padding:6,cursor:'pointer'}} onClick={()=>setActivePath(f)}>{f}</li>))}
    </ul>
  </div>
}