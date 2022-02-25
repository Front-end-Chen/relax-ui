import React, { ChangeEvent, InputHTMLAttributes } from 'react'
// import { IconProp } from '@fortawesome/fontawesome-svg-core';
// import Icon from '../Icon/icon';
import classNames from 'classnames';

// 声明input大小类型
type InputSize = 'lg' | 'sm'

// IconProp为所有fortawesome的icon类型的字面量
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**禁用Input*/
  disabled?: boolean;
  /**Input大小*/
  inputSize?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示*/
  icon?: React.ReactElement;
  /**添加前缀，用于配置一些固定组合*/
  prepend?: string | React.ReactElement;
  /**添加后缀，用于配置一些固定组合*/
  append?: string | React.ReactElement;
  /**自定义Input外层wrapper的行内样式*/
  style?: React.CSSProperties;
  /**输入框change事件*/
  onChange?: (e: ChangeEvent<HTMLInputElement>)=>void
}

/**
 * 输入框组件
 * 
 * ### 引用方法
 * 
 * ~~~ts
 * import { Input } from 'relax-ui'
 * ~~~
 * 
 * **支持原生 Input 的所有基本属性**
 */
export const Input: React.FC<InputProps> = ({
  disabled,
  inputSize,
  icon,
  prepend,
  append,
  style,
  children,
  ...restProps
}) => {

  const classes = classNames('relax-input-wrapper', {
    [`input-size-${inputSize}`]: inputSize,
    'disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  return (
    <div className={classes} style={style}>
      {prepend && <div className="relax-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper">{icon}</div>}
      {/* {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>} */}
      <input 
        className="relax-input-inner"
        disabled={disabled}
        {...restProps}
        />
      {append && <div className="relax-input-group-append">{append}</div>}
      {children}
    </div>
  )
}
