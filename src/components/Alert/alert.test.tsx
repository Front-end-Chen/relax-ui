import { render, fireEvent } from '@testing-library/react'
import  { Alert, AlertProps } from './alert'

const defaultProps: AlertProps = {
  title: 'title',
  onClose: jest.fn()
}
const baseProps: AlertProps = {
  title: 'title',
  description: 'this is alert',
  closable: false,
  alertType: 'success'
}

describe('测试alert组件', () => {
  it('根据默认属性渲染alert', () => {
    const wrapper = render(<Alert {...defaultProps} />)
    const elementTitle = wrapper.getByText('title')
    const elementAlert = elementTitle.parentNode as HTMLDivElement
    const elementClose = elementAlert.children[1]
    expect(elementAlert).toBeInTheDocument()
    expect(elementTitle).toHaveClass('alert-title')
    expect(elementAlert).toHaveClass('alert alert-default')
    expect(elementClose).toHaveClass('alert-close')
    
    fireEvent.click(elementClose)
    expect(defaultProps.onClose).toHaveBeenCalled()
  })
  it('根据基础属性渲染alert', () => {
    const wrapper = render(<Alert {...baseProps} />)
    const elementTitle = wrapper.getByText('title')
    const elementDesc = wrapper.getByText('this is alert')
    const elementAlert = elementTitle.parentNode as HTMLDivElement
    const elementClose = elementAlert.children[2]
    expect(elementAlert).toBeInTheDocument()
    expect(elementAlert).toHaveClass('alert alert-success')
    expect(elementDesc).toHaveClass('alert-desc')
    expect(elementClose).toBeFalsy()
  })
})