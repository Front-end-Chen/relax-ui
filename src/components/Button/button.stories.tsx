import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "./button";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const ButtonType: ComponentStory<typeof Button> = () => {
  return (
    <>
      <Button>button-default</Button>
      <hr />
      <Button btnType="primary">button-primary</Button>
      <hr />
      <Button btnType="danger">button-danger</Button>
      <hr />
      <Button btnType="link">button-link</Button>
      <br />
      <Button btnType="link" href="https://www.baidu.com" target="_blank">
        button-link-href
      </Button>
    </>
  );
};

ButtonType.storyName = "Button类型";

export const ButtonSize: ComponentStory<typeof Button> = () => {
  return (
    <>
      <Button>button-default-defaultsize</Button>
      <hr />
      <Button btnType="primary" size="lg">
        button-primary-lg
      </Button>
      <hr />
      <Button btnType="danger" size="sm">
        button-danger-sm
      </Button>
      <hr />
      <Button btnType="link" size="lg">
        button-link-lg
      </Button>
      <br />
      <Button btnType="link" href="https://www.baidu.com" target="_blank">
        button-link-href-defaultsize
      </Button>
    </>
  );
};

ButtonSize.storyName = "Button大小";

export const ButtonDisabled: ComponentStory<typeof Button> = () => {
  return (
    <>
      <Button disabled>button-default</Button>
      <hr />
      <Button btnType="primary" disabled>
        button-primary
      </Button>
      <hr />
      <Button btnType="danger" disabled>
        button-danger
      </Button>
      <hr />
      <Button btnType="link" disabled>
        button-link
      </Button>
      <br />
      <Button
        btnType="link"
        href="https://www.baidu.com"
        target="_blank"
        disabled
      >
        button-link-href
      </Button>
    </>
  );
};

ButtonDisabled.storyName = "禁用Button";

export const ButtonClickEvent: ComponentStory<typeof Button> = () => {
  return (
    <>
      <Button
        // onClick={action("clicked")}
        onClick={() => {
            alert("点击触发alert");
        }}
      >
        点击触发alert
      </Button>
      <hr />
      <Button
        onClick={() => {
          window.open("https://www.baidu.com");
        }}
        btnType="primary"
      >
        点击跳转百度
      </Button>
      <hr />
    </>
  );
};

ButtonClickEvent.storyName = "Button点击事件";
