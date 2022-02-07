import classNames from 'classnames';
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

// 定义常量类型
type ButtonSize = 'lg' | 'sm'
type ButtonType = 'primary' | 'default' | 'danger' | 'link'

// 定义可配置的Button基本类型
type BaseButtonProps = {
  className: string;
  size: ButtonSize;
  disabled: boolean;
  btnType: ButtonType;
  children: React.ReactNode;
  href: string;
}

// 定义兼容元素原生属性的泛型类型。
// 注意：此处有button与a元素2种结合
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
type ButtonProps = NativeButtonProps & AnchorButtonProps

//利用Partial工具泛型将所有属性变成可选，因为a与button原生属性互斥
const Button: React.FC<Partial<ButtonProps>> = (props) => {
  const {
    size,
    className,
    btnType = 'default',
    disabled = false,
    children,
    href,
    ...restProps
  } = props

  // 使用classnames库拼接classname, 如btn, btn-lg, btn-primary
  // link类型的则拼接，非link的则设置原生属性即可
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': btnType === 'link' && disabled,
  })
  if (btnType === 'link' && href) {
    return (
      <a 
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>)
  } else {
    return (
    <button
      className={classes}
      disabled={disabled}
      {...restProps}
    >
        {children}
    </button>)
  }
};

export default Button;