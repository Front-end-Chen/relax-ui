type Mode = 'line' | 'card'

export type SelectCallback = (index: number) => void

export interface TabsProps {
  /**Tabs的子节点*/
  children?: React.ReactNode;
  /**自定义Tabs外层wrapper的样式*/
  className?: string;
  /**Tabs显示模式*/
  mode?: Mode;
  /**默认显示的TabItem索引*/
  defaultIndex?: number;
  /**选中TabItem的回调*/
  onSelect?: SelectCallback;
}

export interface TabItemProps {
  /**TabItem的子节点*/
  children?: React.ReactNode;
  /**TabItem标题*/
  title: string | React.ReactNode;
  /**TabItem的索引*/
  index?: number;
  /**禁用TabItem*/
  disabled?: boolean;
}

export interface TabsContextValueProps {
  /**当前TabItem索引*/
  currentIndex?: number;
  /**选中TabItem的回调*/
  onSelect?: SelectCallback;
}

// TabItems组件数组
export type TabItems = React.FunctionComponentElement<TabItemProps>[]
// TabItems对应内容的外层wrapper
export type TabContainer = string | React.ReactNode