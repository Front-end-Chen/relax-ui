import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

// 声明icon主题类型
export type IconTheme = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
interface IconProps extends FontAwesomeIconProps {
  /**FontAwesomeIcon V5的免费图标名称*/
  icon: IconProp;
  /**图标主题*/
  theme?: IconTheme;
}

/**
 * 图标组件
 * 
 * ### 引用方法
 * 
 * ```ts
 * import { Icon } from 'relax-ui'
 * ```
 * 
 * **支持FontAwesomeIcon V5图标的原生属性！**
 */
export const Icon: React.FC<IconProps> = ({
  icon,
  theme,
  className,
  ...restProps
}) => {

  // icon-primary
  const classes = classNames("relax-icon", className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} icon={icon} {...restProps} />
    )
};
