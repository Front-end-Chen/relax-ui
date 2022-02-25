import { FC } from 'react'
import { Menu, MenuProps } from "./menu";
import { MenuItem } from './menuItem';
import { SubMenu, SubMenuProps } from './subMenu';

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuProps>,
  SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent
TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu;
