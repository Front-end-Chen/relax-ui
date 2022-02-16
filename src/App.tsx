import React, { useState } from 'react';
import AutoComplete, { DataSourceType } from './components/AutoComplete/autoComplete';
import Button from "./components/Button/button";
import Icon from './components/Icon/icon';
import Input from './components/Input/input';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Transition from './components/Transition/transition';

interface LakerPlayerProps {
  value: string;
  number: number;
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

// 手动测试组件
function App() {
  const [show, setShow] = useState(false)

  // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  // 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  // const handleFetch = (query: string) => {
  //   return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
  // }

  // const lakersWithNumber = [
  //   {value: 'bradley', number: 11},
  //   {value: 'pope', number: 1},
  //   {value: 'caruso', number: 4},
  //   {value: 'cook', number: 2},
  //   {value: 'cousins', number: 15},
  //   {value: 'james', number: 23},
  //   {value: 'AD', number: 3},
  //   {value: 'green', number: 14},
  //   {value: 'howard', number: 39},
  //   {value: 'kuzma', number: 0},
  // ]
  // const handleFetch = (query: string) => {
  //   return lakersWithNumber.filter(player => player.value.includes(query))
  // }

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items)
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }

  // const renderOption = (item: DataSourceType) => {
  //   // const itemWithlakers= item as DataSourceType<LakerPlayerProps>
  //   const itemWithGithub = item as DataSourceType<GithubUserProps>
  //   return (
  //     // <>
  //     //   <h2>Name: {itemWithlakers.value}</h2>
  //     //   <p>number: {itemWithlakers.number}</p>
  //     // </>
  //     <>
  //      <h2>Name: {itemWithGithub.login}</h2>
  //      <p>url: {itemWithGithub.url}</p>
  //     </>
  //     // 这样写的话，item要写any
  //     // <>
  //     //   <h2>Name: {item.login}</h2>
  //     //   <p>url: {item.url}</p>
  //     // </>
  //   )
  // }

  return (
    <div>
        <AutoComplete
          onSuggest={handleFetch}
          onSelect={()=>{console.log("select")}}
          // renderOption={renderOption}
        />
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
        <Input inputSize="lg" />
        <Input inputSize="sm" icon={<Icon icon="allergies" />} />
        <Input inputSize="sm" prepend="https:" append=".com" />
        <Input inputSize="sm" prepend="https:" append={<Icon icon="coffee" />} />
        <hr />
        <hr />
        <hr />
        
    </div>
  );
}

export default App;