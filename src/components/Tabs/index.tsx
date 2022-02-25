import { FC } from 'react'
import { Tabs } from "./tabs";
import { TabItem } from './tabItem';
import { TabItemProps, TabsProps } from './types';

export type ITabsComponent = FC<TabsProps> & {
  Item: FC<TabItemProps>
}

const TransTabs = Tabs as ITabsComponent
TransTabs.Item = TabItem

export default TransTabs;
