import classNames from "classnames";
import React, {
  MouseEvent,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";

// button大小与button类型的类型声明
type ButtonSize = "lg" | "sm";
type ButtonType = "primary" | "default" | "danger" | "link";
// 声明ButtonProps的基本类型（可配置项）
interface BaseButtonProps {
  /**Button大小*/
  size: ButtonSize;
  /**Button类型*/
  btnType: ButtonType;
  // 以下是原生Button已声明的属性，也可自定义覆盖
  /**自定义Button样式*/
  className: string;
  /**禁用button*/
  disabled: boolean;
  /**button-link跳转的url*/
  href: string;
  /**点击事件回调*/
  onClick: (e: MouseEvent) => void;
  children: React.ReactNode;
}

// 声明兼容元素原生属性的泛型类型。
// 注意：此处有button与a元素2种结合
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
//利用Partial工具泛型将所有属性变成可选，因为a与button原生属性互斥
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 按钮元素
 * 
 * ### 引用方法
 *
 * ```ts
 * import { Button } from 'relax-ui'
 * ```
 */
 export const Button: React.FC<ButtonProps> = ({
  size,
  className,
  btnType = "default",
  disabled = false,
  children,
  href,
  onClick,
  ...restProps
 }) => {
  // 使用classnames库拼接classname, 如btn, btn-lg, btn-primary
  // link类型的则拼接，非link的则设置原生属性即可
  const classes = classNames("relax-btn", className, {
    [`relax-btn-${btnType}`]: btnType,
    [`relax-btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  
  //取消a标签默认行为，禁止跳转
  const disabledClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  //没有href不跳转，但要设置相应的css样式：a:not([href]), a:not([href]):hover
  if (btnType === "link") {
    return (
      <a
        className={classes}
        href={href}
        onClick={disabled ? disabledClick : onClick}
        {...restProps}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        onClick={onClick}
        {...restProps}
      >
        {children}
      </button>
    );
  }
};
