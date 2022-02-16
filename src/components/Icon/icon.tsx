import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

// 声明icon主题类型
type IconTheme = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
type IconThemeProps = {
  theme?: IconTheme
};
type IconProps = IconThemeProps & FontAwesomeIconProps

const Icon: React.FC<IconProps> = props => {
  const {
    theme,
    className,
    ...restProps
  } = props

  // icon-primary
  const classes = classNames("relax-icon", className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
    )
};

export default Icon;