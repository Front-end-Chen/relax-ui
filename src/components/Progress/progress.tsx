import React, { FC } from 'react'
import { IconTheme } from '../Icon/icon'

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: IconTheme;
}

const Progress: FC<ProgressProps> = (props) => {
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

export default Progress;
