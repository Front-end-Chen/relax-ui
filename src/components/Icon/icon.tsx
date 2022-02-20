import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

// 声明icon主题类型
export type IconTheme = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
interface IconProps extends FontAwesomeIconProps {
  icon: IconProp;
  theme?: IconTheme;
}

const Icon: React.FC<IconProps> = props => {
  const {
    icon,
    theme,
    className,
    ...restProps
  } = props

  // icon-primary
  const classes = classNames("relax-icon", className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} icon={icon} {...restProps} />
    )
};

export default Icon;