import React, { FC } from 'react'
import { IconTheme } from '../Icon/icon'

export interface ProgressProps {
  /**进度百分比*/
  percent: number;
  /**进度条高度*/
  strokeHeight?: number;
  /**是否显示进度数字*/
  showText?: boolean;
  /**自定义进度外层wrapper的内联样式*/
  styles?: React.CSSProperties;
  /**设置进度条的主题*/
  theme?: IconTheme;
}

/**
 * 文件上传组件
 * 
 * ### 引用方法
 * 
 * ```ts
 * import { Progress } from 'relax-ui'
 * ```
 */
export const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight=15,
    showText=true,
    styles,
    theme="primary",
  } = props

  return (
    <div className="relax-progress-bar" style={styles}>
      <div className="relax-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
        <div 
          className={`relax-progress-bar-inner color-${theme}`}
          style={{width: `${percent}%`}}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}
