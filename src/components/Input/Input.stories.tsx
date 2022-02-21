import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from 'react';
import { Icon } from '../Icon/icon';
import { Input } from "./input";

export default {
  title: "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

export const InputType: ComponentStory<typeof Input> = () => {
  return (
    <>
      <Input type="text" />
      <hr />
      <Input type="password" />
      <hr />
      <Input type="date" />
      <hr />
      <Input type="number" />
      <hr />
      <Input type="checkbox" style={{display: "inline-block", width: "15px"}} />
      <span>checkbox</span>
    </>
  );
};

InputType.storyName = "Input类型";

export const InputSize: ComponentStory<typeof Input> = () => {
  return (
    <>
      <Input type="text" inputSize="lg" />
      <hr />
      <Input type="password" />
      <hr />
      <Input type="date" inputSize="sm" />
    </>
  );
};

InputSize.storyName = "Input大小";

export const InputDisabled: ComponentStory<typeof Input> = () => {
  return (
    <>
      <Input disabled type="text" inputSize="lg" />
      <hr />
      <Input disabled type="date" inputSize="sm" />
    </>
  );
};

InputDisabled.storyName = "禁用Input";

export const InputIcon: ComponentStory<typeof Input> = () => {
  return (
    <>
      <Input inputSize="lg" icon={<Icon icon="allergies" />} />
    </>
  );
};

InputIcon.storyName = "Input右侧提示图标";

export const InputExpand: ComponentStory<typeof Input> = () => {
  return (
    <>
      <Input prepend="https:" append=".com" />
      <Input inputSize="sm" prepend="https:" append={<Icon icon="coffee" />} />
    </>
  );
};

InputExpand.storyName = "Input前后缀";

export const InputChangeEvent: ComponentStory<typeof Input> = () => {
  const [val, setVal] = useState("")
  return (
    <>
      <Input type="text" value={val} onChange={(e)=>{setVal(e.target.value)}} />
      <div>{val}</div>
    </>
  );
};

InputChangeEvent.storyName = "Input的Change事件";