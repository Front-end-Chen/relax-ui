import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from 'react';
import { Button } from '../Button/button';
import { Transition } from "./transition";

export default {
  title: "Transition",
  component: Transition,
} as ComponentMeta<typeof Transition>;

export const TransitionExample: ComponentStory<typeof Transition> = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <h4>基于react-transition-group的CSSTransition过渡</h4>
      <Button
        btnType="primary"
        onClick={() => {
          setShow(!show);
        }}
      >
        测试Transition
      </Button>
      <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
        <div>
          <p>ffewfewgewgewgegergerg个然后让他忽然他</p>
          <p>ffewfewgewgewgegergerg个然后让他忽然他</p>
          <p>ffewfewgewgewgegergerg个然后让他忽然他</p>
        </div>
        <Button btnType="danger" size="sm">
          感叹号！
        </Button>
      </Transition>
    </>
  );
};

TransitionExample.storyName = "Transition演示";
