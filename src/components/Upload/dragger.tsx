import React, { useState, DragEvent } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile: (files: FileList) => void;
}

export const Dragger: React.FC<DraggerProps> = ({
  onFile,
  children
}) => {

  const [ dragOver, setDragOver ] = useState(false)
  const classes = classNames('relax-uploader-dragger', {
    'dragover': dragOver
  })

  // 拖拽进去松手后触发的回调
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }
  // 拖拽进到上传区域时 或 离开时，触发的回调
  const handleDrag = (e: DragEvent<HTMLDivElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }

  return (
    <div 
      className={classes}
      onDragOver={e => { handleDrag(e, true)}}
      onDragLeave={e => { handleDrag(e, false)}}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger;