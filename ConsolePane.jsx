import React, {useImperativeHandle, forwardRef, useState} from 'react'
const ConsolePane = forwardRef((props, ref) =>{
  const [lines, setLines] = useState([])
  useImperativeHandle(ref, ()=>({ append(m){ setLines(l=>[...l, JSON.stringify(m)]) } })) 
  return <div className="console">{lines.map((l,i)=>(<div key={i}>{l}</div>))}</div>
})
export default ConsolePane