import classNames from 'classnames'
import React, { MouseEvent, useContext, useState } from 'react'
import { Icon } from '../Icon/icon';
import { Transition } from '../Transition/transition';
import { activeContext } from './menu'
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: string;
  /**submenu标题*/
  title: string;
  /**自定义submenu外层wrapper元素的样式*/
  className?: string;
  children?: React.ReactNode,
}

/**
 * 二级菜单
 *
 * ### 引用方法
 *
 * ```ts
 * import { Menu.SubMenu } from 'relax-ui'
 * ```
 */
export const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className
}) => {

  const context = useContext(activeContext)
  // 实现默认打开二级菜单
  const isOpend = (index && context.mode === "vertical") ? context.defaultOpenSubMenus!.includes(index) : false

  const [menuOpen, setMenuOpen] = useState<boolean>(isOpend)

  const classes = classNames("relax-menu-item relax-submenu-item", className , {
    "active": context.index!.split("-")[0] === index,
    "opened": menuOpen
  })

  // vertical方向点击菜单展开响应函数
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setMenuOpen(!menuOpen)
  }

  // horizontal方向鼠标进入时菜单展开响应函数
  let timer: any
  const handleMouse = (e: MouseEvent<HTMLLIElement>, toggle: boolean) => {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      // 优化性能-已经是打开状态 且 传入的toggle是true，则不再触发setMenuOpen，而导致重新渲染
      if(menuOpen === true && toggle === true) return
      setMenuOpen(toggle)
    }, 200);
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: MouseEvent<HTMLLIElement>) => { handleMouse(e, true) },
    onMouseLeave: (e: MouseEvent<HTMLLIElement>) => { handleMouse(e, false) }
  } : {}

  //渲染二级菜单
  const renderChildren = () => {
    const classes = classNames("relax-submenu", {
      "menu-opened": menuOpen
    })

    // 使用React.Children.map遍历children属性
    const childrenElement = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if(displayName === "MenuItem"){
        // 使用React.cloneElement给遍历的每个节点传递props
        // 使用字符串索引兼容二级菜单
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        throw new Error("Error: SubMenu has a child which is not a MenuItem component")
      }
    })

    return (   
      <Transition
        in={menuOpen}
        animation="zoom-in-top"
        timeout={300}
      >
        <ul className={classes}>
          {childrenElement}
        </ul>
      </Transition>
    )
  }

  return (
    <li className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  )
}

// 使用displayName保存组件名，获取时通过断言为React.FunctionComponentElement，再通过.type.displayName获取
SubMenu.displayName = 'SubMenu';