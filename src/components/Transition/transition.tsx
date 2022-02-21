import React from 'react';
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionClassNames, CSSTransitionProps } from 'react-transition-group/CSSTransition'

// 声明animation的类型
type animations = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

// 声明可配置的TransitionProps基本类型
type TransitionProps = CSSTransitionProps & {
  /**绑定控制动画效果切换的属性*/
  in?: boolean;
  /**设置动画的类型*/
  timeout?: number;
  /**设置动画的类型，可自定义classNames*/
  animation?: animations;
  /**是否添加div元素包裹*/
  wrapper? : boolean;
  /**钩子函数。其他钩子函数见react-transition-group官网*/
  onEntered?: (e: any) => void;
  /**自定义过渡样式*/
  classNames?: CSSTransitionClassNames;
};

/**
 * 过渡组件
 * 
 * ### 引用方法
 * 
 * ```ts
 * import { Transition } from 'relax-ui'
 * ```
 * 
 * **支持react-transition-group的原生属性！**
 */
export const Transition: React.FC<TransitionProps> = ({
  animation,
  children,
  classNames,
  unmountOnExit = true,
  wrapper = false,
  ...restProps
}) => {
  
  return (
    <CSSTransition
        classNames={classNames ? classNames : animation}
        unmountOnExit={unmountOnExit}
        {...restProps}
      >
        {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};
