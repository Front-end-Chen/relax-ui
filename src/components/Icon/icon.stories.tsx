import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Icon } from "./icon";

export default {
  title: "Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

export const IconType: ComponentStory<typeof Icon> = () => {
  return (
    <>
      <h4>基于FontAwesomeIcon V5的免费图标</h4>
      <Icon icon="coffee" size="5x" />
      <br />
      <Icon icon="address-card" size="3x" />
      <br />
      <Icon icon="business-time" size="4x" />
    </>
  );
};

IconType.storyName = "Icon类型";

export const IconTheme: ComponentStory<typeof Icon> = () => {
  return (
    <>
      <h4>基于FontAwesomeIcon V5的免费图标</h4>
      <Icon icon="coffee" theme="primary" size="5x" />
      <br />
      <Icon icon="address-card" theme="danger" size="3x" />
      <br />
      <Icon icon="business-time" theme="success" size="4x" />
      <br />
      <Icon icon="air-freshener" theme="info" size="2x" />
    </>
  );
};

IconTheme.storyName = "Icon主题";
