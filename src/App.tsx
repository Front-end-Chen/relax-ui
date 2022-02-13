import React from "react";
import Button from "./components/Button/button";
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

// 手动测试组件
function App() {
  return (
    <div>
        <hr />
        <Button
          onClick={() => {
            alert(1);
          }}
        >
          hello
        </Button>
        <hr />
        <Button btnType="primary" size="lg">
          hello-primary-lg
        </Button>
        <hr />
        <Button disabled btnType="primary">
          hello-disabled
        </Button>
        <hr />
        <Button btnType="danger" size='sm'>hello-danger</Button>
        <hr />
        <Button btnType="link" size="lg" href="https://www.baidu.com">
          hello
        </Button>
        <hr />
        <Button
          disabled
          btnType="link"
          href="https://www.baidu.com"
          target="_blank"
          size="sm"
        >
          hello
        </Button>
        <hr />
        <hr />
        <hr />
        <Menu defaultIndex="0" onSelect={(si)=>{}}>
          <MenuItem>aaa</MenuItem>
          <SubMenu title='ddd'>
            <MenuItem>eee</MenuItem>
            <MenuItem>fff</MenuItem>
            <MenuItem>ggg</MenuItem>
          </SubMenu>
          <MenuItem>
            <a href="https://www.qq.com">bbb</a>
          </MenuItem>
          <MenuItem disabled>ccc</MenuItem>
        </Menu>
        <Menu defaultIndex="1-2" mode="vertical" defaultOpenSubMenus={['1']}>
          <MenuItem>aaa</MenuItem>
          <SubMenu title='vvvv'>
            <MenuItem>veee</MenuItem>
            <MenuItem>vfff</MenuItem>
            <MenuItem>vggg</MenuItem>
          </SubMenu>
          <MenuItem>ccc</MenuItem>
        </Menu>
    </div>
  );
}

export default App;
