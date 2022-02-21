import classNames from "classnames";
import React, { createContext, useState } from "react";
import { MenuItemProps } from "./menuItem";

// 声明menu显示方向的类型
type MenuMode = "horizontal" | "vertical";

// 声明 可配置 的MenuProps基本类型
export interface MenuProps {
  // 为了使二级菜单的选项能被点击选择，将defaultIndex改为string类型
  /**
   * 默认选中的menu项索引
   * 一级菜单："0"
   * 二级菜单："1-1"
   * */
  defaultIndex?: string;
  /**menu显示模式*/
  mode?: MenuMode;
  /**选中menu项的回调*/
  onSelect?: (selectedIndex: string) => void;
  /**自定义menu外层wrapper元素的样式*/
  className?: string;
  /**submenu项默认打开*/
  defaultOpenSubMenus?: string[];
}

// activeContext的类型
interface active {
  index?: string;
  onSelect?: (selectedIndex: string) => void;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

// 创建context传递activeIndex，onSelect，mode，defaultOpenSubMenus
export const activeContext = createContext<active>({ index: "0" });

/**
 * 菜单组件
 *
 * ### 引用方法
 *
 * ```ts
 * import { Menu } from 'relax-ui'
 * ```
 */
export const Menu: React.FC<MenuProps> = ({
  defaultIndex = "0",
  mode = "horizontal",
  onSelect,
  children,
  className,
  defaultOpenSubMenus = [],
}) => {
  // 当前active的item索引
  const [currentActive, setActive] = useState<string>(defaultIndex);

  // item的click回调函数
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  // context传递的value
  const activeContextValue = {
    index: currentActive,
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  const classes = classNames("relax-menu", className, {
    "relax-menu-vertical": mode === "vertical",
    "relax-menu-horizontal": mode !== "vertical",
  });

  // 渲染子节点的函数
  const renderChildren = () => {
    // 使用React.Children.map遍历children属性
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        // 使用React.cloneElement给遍历的每个节点传递props
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        throw new Error(
          "Error: Menu has a child which is not a MenuItem component"
        );
      }
    });
  };

  // data-testid="test-menu"用于自动化测试用例
  return (
    <ul className={classes} data-testid="test-menu">
      <activeContext.Provider value={activeContextValue}>
        {renderChildren()}
      </activeContext.Provider>
    </ul>
  );
};
