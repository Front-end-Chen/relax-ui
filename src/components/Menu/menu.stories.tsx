import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Menu } from "./menu";
import { MenuItem } from "./menuItem";
import { SubMenu } from "./subMenu";

export default {
  title: "Menu",
  component: Menu,
  subcomponents: {
    MenuItem,
    SubMenu
  }
} as ComponentMeta<typeof Menu>;

export const MenuType: ComponentStory<typeof Menu> = () => {
  return (
    <>
      <Menu>
        <MenuItem>menuitem1</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>submenu1</MenuItem>
          <MenuItem>submenu2</MenuItem>
          <MenuItem>submenu3</MenuItem>
        </SubMenu>
        <MenuItem>
          <a href="https://www.qq.com" target="_blank">
            menuitem2
          </a>
        </MenuItem>
        <MenuItem>menuitem3</MenuItem>
      </Menu>
    </>
  );
};

MenuType.storyName = "Menu类型";

export const MenuMode: ComponentStory<typeof Menu> = () => {
  return (
    <>
      <Menu mode="horizontal">
        <MenuItem>menuitem1</MenuItem>
        <MenuItem>menuitem2</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>submenu1</MenuItem>
          <MenuItem>submenu2</MenuItem>
          <MenuItem>submenu3</MenuItem>
        </SubMenu>
      </Menu>
      <hr />
      <Menu mode="vertical">
        <MenuItem>menuitem1</MenuItem>
        <MenuItem>menuitem2</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>submenu1</MenuItem>
          <MenuItem>submenu2</MenuItem>
          <MenuItem>submenu3</MenuItem>
        </SubMenu>
      </Menu>
    </>
  );
};

MenuMode.storyName = "Menu显示模式";

export const MenuDefaultSelect: ComponentStory<typeof Menu> = () => {
  return (
    <>
      <Menu defaultIndex="1" mode="horizontal">
        <MenuItem>menuitem1</MenuItem>
        <MenuItem>menuitem2</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>submenu1</MenuItem>
          <MenuItem>submenu2</MenuItem>
          <MenuItem>submenu3</MenuItem>
        </SubMenu>
      </Menu>
      <hr />
      <Menu defaultIndex="2-1" mode="vertical">
        <MenuItem>menuitem1</MenuItem>
        <MenuItem>menuitem2</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>submenu1</MenuItem>
          <MenuItem>submenu2</MenuItem>
          <MenuItem>submenu3</MenuItem>
        </SubMenu>
      </Menu>
    </>
  );
};

MenuDefaultSelect.storyName = "Menu项默认选中";

export const MenuDefaultOpenSubMenus: ComponentStory<typeof Menu> = () => {
  return (
    <>
      <h4>仅针对竖向二级菜单</h4>
      <Menu defaultOpenSubMenus={["1", "3"]} mode="vertical">
        <MenuItem>menuitem1</MenuItem>
        <SubMenu title="submenu1">
          <MenuItem>submenuitem1</MenuItem>
          <MenuItem>submenuitem2</MenuItem>
          <MenuItem>submenuitem3</MenuItem>
        </SubMenu>
        <MenuItem>menuitem2</MenuItem>
        <SubMenu title="submenu2">
          <MenuItem>submenuitem1</MenuItem>
          <MenuItem>submenuitem2</MenuItem>
          <MenuItem>submenuitem3</MenuItem>
        </SubMenu>
      </Menu>
    </>
  );
};

MenuDefaultOpenSubMenus.storyName = "SubMenu项默认打开";

export const MenuSelectEvent: ComponentStory<typeof Menu> = () => {
  return (
    <>
      <Menu
        onSelect={index => {
          alert("索引：" + index);
        }}
        defaultIndex="1"
        mode="horizontal"
      >
        <MenuItem>menuitem1</MenuItem>
        <MenuItem>menuitem2</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>submenu1</MenuItem>
          <MenuItem>submenu2</MenuItem>
          <MenuItem>submenu3</MenuItem>
        </SubMenu>
      </Menu>
      <hr />
      <Menu
        onSelect={index => {
          alert("索引：" + index);
        }}
        mode="vertical"
      >
        <MenuItem>menuitem1</MenuItem>
        <MenuItem>menuitem2</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>submenu1</MenuItem>
          <MenuItem>submenu2</MenuItem>
          <MenuItem>submenu3</MenuItem>
        </SubMenu>
      </Menu>
    </>
  );
};

MenuSelectEvent.storyName = "Menu项选中事件";
