import React, { useContext, MouseEvent } from 'react'
import classnames from 'classnames'

import { TabsContext } from './tabs'
import { TabItemProps } from './types'

export const TabItem: React.FC<TabItemProps> = ({
  title,
  index,
  disabled
}) => {

  const TabsContextValue = useContext(TabsContext)
  const { currentIndex, onSelect } = TabsContextValue
  const isActive: boolean = currentIndex === index

  const handleSelect = (e: MouseEvent<HTMLLIElement>) => {
    if(onSelect && typeof index === 'number' && !disabled) {
      onSelect(index)
    }
  }
  const classes = classnames('tabs-nav-item', {
    'active': isActive,
    'disabled': disabled
  })
  return (
    <li 
      className={classes}
      onClick={handleSelect}
    >
      {title}
    </li>
  )
}

TabItem.displayName = 'TabItem'
