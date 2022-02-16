import classNames from 'classnames'
import React, { useContext, MouseEventHandler } from 'react'
import { activeContext } from './menu'

export type MenuItemProps = {
  index?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    index,
    disabled,
    style,
    children,
    className
  } = props

  const context = useContext(activeContext)

  const handleClick: MouseEventHandler<HTMLLIElement> = () => {
    //使用非空断言更简单！
    if (context.onSelect && !disabled) {
      context.onSelect(index!)
    }
    // if (context.onSelect && !disabled && typeof index === "string") {
    //   context.onSelect(index)
    // }
  }

  const classes = classNames("relax-menu-item", className , {
    "disabled": disabled,
    "active": context.index === index
  })

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

// 使用displayName保存组件名，获取时通过断言为React.FunctionComponentElement，再通过.type.displayName获取
MenuItem.displayName = 'MenuItem'
export default MenuItem;