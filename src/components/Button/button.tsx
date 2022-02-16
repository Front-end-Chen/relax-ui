import classNames from "classnames";
import React, {
  MouseEventHandler,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from "react";

// button大小与button类型的类型声明
type ButtonSize = "lg" | "sm";
type ButtonType = "primary" | "default" | "danger" | "link";

// 声明ButtonProps的基本类型（可配置项）
interface BaseButtonProps {
  size: ButtonSize;
  btnType: ButtonType;
  // 以下属性react已声明，也可覆盖
  className: string;
  children: React.ReactNode;
  disabled: boolean;
  href: string;
  onClick: MouseEventHandler<HTMLElement>;
}

// 声明兼容元素原生属性的泛型类型。
// 注意：此处有button与a元素2种结合
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

//利用Partial工具泛型将所有属性变成可选，因为a与button原生属性互斥
const Button: React.FC<ButtonProps> = props => {
  const {
    size,
    className,
    btnType = "default",
    disabled = false,
    children,
    href,
    onClick,
    ...restProps
  } = props;

  // 使用classnames库拼接classname, 如btn, btn-lg, btn-primary
  // link类型的则拼接，非link的则设置原生属性即可
  const classes = classNames("relax-btn", className, {
    [`relax-btn-${btnType}`]: btnType,
    [`relax-btn-${size}`]: size,
    "disabled": btnType === "link" && disabled,
  });

  //取消a标签默认行为，禁止跳转
  const disabledClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
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

export default Button;