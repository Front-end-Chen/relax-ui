import { useState } from 'react';
import Button from "./components/Button/button";
import Icon from './components/Icon/icon';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Transition from './components/Transition/transition';

// 手动测试组件
function App() {
  const [show, setShow] = useState(false)

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
        <Button btnType="link" size="lg" href="https://www.baidu.com" target="_blank">
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
            <a href="https://www.qq.com" target="_blank">bbb</a>
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
        <hr />
        <hr />
        <hr />
        <Button btnType="primary" onClick={()=>{setShow(!show)}}>测试Transition</Button>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
          wrapper
        >
          <div>
            <p>ffewfewgewgewgegergerg个然后让他忽然他</p>
            <p>ffewfewgewgewgegergerg个然后让他忽然他</p>
            <p>ffewfewgewgewgegergerg个然后让他忽然他</p>
          </div>
          <Button btnType="danger" size="sm">感叹号！</Button>
        </Transition>
        <hr />
        <hr />
        <hr />
        <Icon icon="coffee" size="6x" />
        <Icon icon="address-card" size="2x" />
        <Icon icon="business-time" size="4x" />
        <hr />
        <hr />
        <hr />
    </div>
  );
}

export default App;
