import React, { ChangeEventHandler, InputHTMLAttributes } from 'react'
// import { IconProp } from '@fortawesome/fontawesome-svg-core';
// import Icon from '../Icon/icon';
import classNames from 'classnames';

// 声明input大小类型
type InputSize = 'lg' | 'sm'

// IconProp为所有fortawesome的icon类型的字面量
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  inputSize?: InputSize;
  icon?: React.ReactElement; 
  prepend?: string | React.ReactElement;
  append?: string | React.ReactElement;
  style?: React.CSSProperties;
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({
  disabled,
  inputSize,
  icon,
  prepend,
  append,
  style,
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
    </div>
  )
}

export default Input;