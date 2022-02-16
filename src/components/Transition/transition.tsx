import React from 'react';
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'


// 声明animation的类型
type animations = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

// 声明可配置的TransitionProps基本类型
type TransitionProps = CSSTransitionProps & {
  animation?: animations;
  // 是否添加div包裹
  wrapper? : boolean;
};

const Transition: React.FC<TransitionProps> = props => {
  const {
    animation,
    children,
    classNames,
    unmountOnExit = true,
    wrapper = false,
    ...restProps
  } = props;

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

export default Transition;