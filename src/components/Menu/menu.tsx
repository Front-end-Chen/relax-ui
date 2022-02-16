import classNames from "classnames";
import React, { createContext, useState } from "react";
import { MenuItemProps } from './menuItem';

// 声明menu显示方向的类型
type MenuMode = "horizontal" | "vertical";

// 声明可配置的MenuProps基本类型
// 为了使下拉菜单的选项能点击选择，将defaultIndex改为string类型
export type MenuProps = {
  defaultIndex?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: string) => void;
  className?: string;
  defaultOpenSubMenus?: string[];
};

// activeContext的类型
type active = {
  index?: string;
  onSelect?: (selectedIndex: string) => void;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
};

// 创建context传递activeIndex，onSelect，mode，defaultOpenSubMenus
export const activeContext = createContext<active>({index: '0'});

const Menu: React.FC<MenuProps> = props => {
  const {
    defaultIndex = '0',
    mode = "horizontal",
    onSelect,
    children,
    style,
    className,
    defaultOpenSubMenus = []
  } = props;

  // 当前active的item索引
  const [currentActive, setActive] = useState<string>(defaultIndex)
  
  // item的click回调函数
  const handleClick = (index: string) => {
    setActive(index)
    if(onSelect){
      onSelect(index)
    }
  }

  // context传递的value
  const activeContextValue = {
    index: currentActive,
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const classes = classNames("relax-menu", className, {
    "relax-menu-vertical": mode === "vertical",
    "relax-menu-horizontal": mode !== "vertical",
  });

  const renderChildren = () => {
    // 使用React.Children.map遍历children属性
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if(displayName === "MenuItem" || displayName === "SubMenu"){
        // 使用React.cloneElement给遍历的每个节点传递props
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        throw new Error("Error: Menu has a child which is not a MenuItem component")
      }
    })
  }

  // data-testid="test-menu"用于自动化测试用例
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <activeContext.Provider value={activeContextValue}>
        {renderChildren()}
      </activeContext.Provider>
    </ul>
  );
};

export default Menu;
