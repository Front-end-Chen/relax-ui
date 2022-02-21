import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Tabs } from './tabs'
import { TabItem } from './tabItem'
import { TabsProps } from './types'

const baseProps:TabsProps = {
  className: 'Jellal',
  onSelect: jest.fn(),
}

const cardProps: TabsProps = {
  mode: 'card'
}

const TabsComponent: React.FC<TabsProps> = (props) => {
  return (
    <Tabs {...props}>
      <TabItem title="one">
        this is content one
      </TabItem>
      <TabItem title="two">
        this is content two
      </TabItem>
      <TabItem disabled title="three">
        this is content three
      </TabItem>
    </Tabs>
  )
}
let 
  tabsElement: HTMLElement,
  contentElement: HTMLElement,
  oneTabItemElement: HTMLElement,
  twoTabItemElement: HTMLElement,
  threeTabItemElement: HTMLElement

describe('tabs组件测试', () => {
  beforeEach(() => {
    const wrapper = render(<TabsComponent {...baseProps} />)
    const container = wrapper.container
    tabsElement = container.getElementsByClassName('tabs')[0] as HTMLElement
    contentElement = container.getElementsByClassName('tabs-content')[0] as HTMLElement
    oneTabItemElement = wrapper.getByText('one')
    twoTabItemElement = wrapper.getByText('two')
    threeTabItemElement = wrapper.getByText('three')
  })

  it('根据基础属性渲染tabs组件', () => {
    expect(tabsElement).toBeInTheDocument()
    expect(tabsElement).toHaveClass('tabs Jellal tabs-line')
    expect(tabsElement.getElementsByTagName('li').length).toEqual(3)

    expect(oneTabItemElement).toHaveClass('active')
    expect(threeTabItemElement).toHaveClass('disabled')

    expect(contentElement.innerHTML).toEqual('this is content one')
  })

  it('根据TabItem点击事件测试', () => {
    fireEvent.click(twoTabItemElement)
    expect(baseProps.onSelect).toHaveBeenCalled()
    expect(baseProps.onSelect).toHaveBeenCalledWith(1)

    expect(oneTabItemElement).not.toHaveClass('active')
    expect(twoTabItemElement).toHaveClass('active')
    expect(contentElement.innerHTML).toEqual('this is content two')

    fireEvent.click(threeTabItemElement)
    expect(baseProps.onSelect).not.toHaveBeenCalledWith(2)
    
    expect(twoTabItemElement).toHaveClass('active')
    expect(threeTabItemElement).not.toHaveClass('active')
    expect(contentElement.innerHTML).toEqual('this is content two')
  })

  it('根据mode=card测试tabs组件', () => {
    const wrapper = render(<TabsComponent {...cardProps} />)
    const container = wrapper.container

    const tabsElement = container.getElementsByClassName('tabs')[0] as HTMLElement
    expect(tabsElement).toBeInTheDocument()
    expect(tabsElement).toHaveClass('tabs-card')
  })
})