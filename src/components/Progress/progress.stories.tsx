import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Progress } from "./progress";

export default {
  title: "Progress",
  component: Progress,
} as ComponentMeta<typeof Progress>;

export const ProgressSimple: ComponentStory<typeof Progress> = () => {
  return (
    <>
      <Progress
        percent={60}
        strokeHeight={20}
        theme="primary"
      />
      <hr />
      <Progress
        percent={100}
        strokeHeight={20}
        showText={false}
        theme="success"
      />
      <hr />
      <Progress
        percent={30}
        strokeHeight={20}
        showText={true}
        theme="danger"
      />
    </>
  );
};

ProgressSimple.storyName = "Progress演示";
