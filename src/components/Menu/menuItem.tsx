import classNames from "classnames";
import React, { useContext, MouseEventHandler } from "react";
import { activeContext } from "./menu";

export interface MenuItemProps {
  index?: string;
  /**禁用菜单项*/
  disabled?: boolean;
  /**自定义菜单项样式*/
  className?: string;
  children?: React.ReactNode;
}

/**
 * 菜单项
 *
 * ### 引用方法
 *
 * ```ts
 * import { Menu.Item } from 'relax-ui'
 * ```
 */
export const MenuItem: React.FC<MenuItemProps> = ({
  index,
  disabled,
  children,
  className
}) => {

  // 使用useContext的hook获取父组件传递的属性
  const context = useContext(activeContext);
  
  const handleClick: MouseEventHandler<HTMLLIElement> = () => {
    //使用非空断言更简单！
    if (context.onSelect && !disabled) {
      context.onSelect(index!);
    }
    // if (context.onSelect && !disabled && typeof index === "string") {
    //   context.onSelect(index)
    // }
  };

  const classes = classNames("relax-menu-item", className, {
    disabled: disabled,
    active: context.index === index,
  });

  return (
    <li className={classes} onClick={handleClick}>
      {children}
    </li>
  );
};

// 使用displayName保存组件名，获取时通过断言为React.FunctionComponentElement，再通过.type.displayName获取
MenuItem.displayName = "MenuItem";
