import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Icon } from '../Icon/icon';
import { Alert } from "./alert";

export default {
  title: "Alert",
  component: Alert,
} as ComponentMeta<typeof Alert>;

export const AlertType: ComponentStory<typeof Alert> = () => {
  return (
    <>
      <Alert title="default" description="this is a default alert!" />
      <br />
      <Alert
        title="success"
        alertType="success"
        description="this is a success alert!"
      />
      <br />
      <Alert
        title="danger"
        alertType="danger"
        description="this is a danger alert!"
      />
    </>
  );
};

AlertType.storyName = "Alert类型";

export const AlertClosed: ComponentStory<typeof Alert> = () => {
  return (
    <>
      <Alert
        title="warning"
        alertType="warning"
        description="this is a warning alert!"
        closable
      />
      <br />
      <Alert
        title="success"
        alertType="success"
        description="this is a success alert!"
        closable
      />
    </>
  );
};

AlertClosed.storyName = "Alert可关闭";

export const AlertCustomClosed: ComponentStory<typeof Alert> = () => {
  return (
    <>
      <Alert
        title="danger"
        alertType="danger"
        description="this is a danger alert!"
        closable
      >
        <Icon icon="window-close" size="1x" />
      </Alert>
    </>
  );
};

AlertCustomClosed.storyName = "Alert自定义关闭图标";

export const AlertClosedEvent: ComponentStory<typeof Alert> = () => {
  return (
    <>
      <Alert
        title="warning"
        alertType="warning"
        description="this is a warning alert!"
        closable
        onClose={() => {
          console.log("warning alert is closed!");
        }}
      />
    </>
  );
};

AlertClosedEvent.storyName = "Alert点击关闭事件";
