import React, { useState, MouseEvent } from 'react'
import classnames from 'classnames'

// 定义Alert类型
export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
  /**Alert标题*/
  title: string;
  /**Alert主要内容*/
  description?: string;
  /**Alert类型*/
  alertType?: AlertType;
  /**点击关闭回调*/
  onClose?: (e: MouseEvent) => void;
  /**是否可关闭*/
  closable?: boolean;
  /**自定义外层wrapper的样式*/
  className?: React.CSSProperties;
}

/**
 * 警告框元素
 * 
 * ### 引用方法
 *
 * ```ts
 * import { Alert } from 'relax-ui'
 * ```
 */
export const Alert: React.FC<AlertProps>= ({
    title,
    description,
    alertType='default',
    onClose,
    closable=false,
    className,
    children
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const classes = classnames('alert', className, {
    [`alert-${alertType}`]: alertType,
    "closed": !isOpen
  })
  const titleClassNames = classnames('alert-title', {
    'alert-bold': description
  })

  const handleClick = (e: MouseEvent) => {
    setIsOpen(false)
    if (onClose) {
      onClose(e)
    }
  }
  return (
    <div className={classes}>
      <span className={titleClassNames}>{title}</span>
      {description && 
        <p className='alert-desc'>{description}</p>
      }
      {closable && 
        <span onClick={handleClick} className='alert-close'>{children ? children: "关闭"}</span>
      }
    </div>
  )
}
