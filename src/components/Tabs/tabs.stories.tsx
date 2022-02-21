import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tabs } from "./tabs";
import { TabItem } from "./tabItem";
import { Button } from "../Button/button";

export default {
  title: "Tabs",
  component: Tabs,
  subcomponents: {
    TabItem,
  },
} as ComponentMeta<typeof Tabs>;

export const TabsMode: ComponentStory<typeof Tabs> = () => {
  return (
    <>
      <Tabs>
        <TabItem title="TabItem1">TabItem1</TabItem>
        <TabItem title="TabItem2">TabItem2</TabItem>
        <TabItem title="TabItem3">TabItem3</TabItem>
      </Tabs>
      <hr />
      <Tabs mode="card">
        <TabItem title="TabItem1">TabItem1</TabItem>
        <TabItem title="TabItem2">TabItem2</TabItem>
        <TabItem title="TabItem3">TabItem3</TabItem>
      </Tabs>
    </>
  );
};

TabsMode.storyName = "Tabs类型";

export const TabsDefaultIndex: ComponentStory<typeof Tabs> = () => {
  return (
    <>
      <Tabs defaultIndex={0}>
        <TabItem title="TabItem1">TabItem1</TabItem>
        <TabItem title="TabItem2">TabItem2</TabItem>
        <TabItem title="TabItem3">TabItem3</TabItem>
      </Tabs>
      <hr />
      <Tabs mode="card" defaultIndex={2}>
        <TabItem title="TabItem1">TabItem1</TabItem>
        <TabItem title="TabItem2">TabItem2</TabItem>
        <TabItem title="TabItem3">TabItem3</TabItem>
      </Tabs>
    </>
  );
};

TabsDefaultIndex.storyName = "默认显示的TabItem";

export const TabItemDisabled: ComponentStory<typeof Tabs> = () => {
  return (
    <>
      <Tabs defaultIndex={0}>
        <TabItem title="TabItem1">TabItem1</TabItem>
        <TabItem title="TabItem2" disabled>
          TabItem2
        </TabItem>
        <TabItem title="TabItem3">TabItem3</TabItem>
      </Tabs>
      <hr />
      <Tabs mode="card" defaultIndex={2}>
        <TabItem title="TabItem1" disabled>
          TabItem1
        </TabItem>
        <TabItem title="TabItem2">TabItem2</TabItem>
        <TabItem title="TabItem3">TabItem3</TabItem>
      </Tabs>
    </>
  );
};

TabItemDisabled.storyName = "禁用TabItem";

export const TabItemSelect: ComponentStory<typeof Tabs> = () => {
  return (
    <>
      <Tabs
        defaultIndex={0}
        onSelect={index => {
          alert(index);
        }}
      >
        <TabItem title="TabItem1">TabItem1</TabItem>
        <TabItem title="TabItem2">TabItem2</TabItem>
        <TabItem title="TabItem3">TabItem3</TabItem>
      </Tabs>
      <hr />
      <Tabs
        mode="card"
        defaultIndex={1}
        onSelect={index => {
          console.log(index);
        }}
      >
        <TabItem title="TabItem1">TabItem1</TabItem>
        <TabItem title="TabItem2">TabItem2</TabItem>
      </Tabs>
    </>
  );
};

TabItemSelect.storyName = "TabItem点击事件";

export const TabItemCustom: ComponentStory<typeof Tabs> = () => {
  return (
    <>
      <Tabs defaultIndex={0}>
        <TabItem title="TabItem1">TabItem1</TabItem>
        <TabItem title="TabItem2">TabItem2</TabItem>
        <TabItem
          title={
            <a href="https://www.baidu.com" target="_blank">
              跳转百度
            </a>
          }
        >
          TabItem3
        </TabItem>
      </Tabs>
      <hr />
      <Tabs mode="card" defaultIndex={1}>
        <TabItem title="TabItem1">
          <Button btnType="primary">Button1</Button>
        </TabItem>
        <TabItem title="TabItem2">TabItem2</TabItem>
      </Tabs>
    </>
  );
};

TabItemCustom.storyName = "TabItem自定义title和children";
