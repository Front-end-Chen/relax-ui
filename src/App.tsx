import { ChangeEvent, MouseEvent, useState } from "react";
import axios from "axios";
import { AutoComplete, DataSourceType } from "./components/AutoComplete/autoComplete";
import { Button } from "./components/Button/button";
import { Icon } from "./components/Icon/icon";
import { Input } from "./components/Input/input";
import { Menu } from "./components/Menu/menu";
import { MenuItem } from "./components/Menu/menuItem";
import { SubMenu } from "./components/Menu/subMenu";
import { Transition } from "./components/Transition/transition";
// import request from './util/request';
import { Upload, UploadFile } from './components/Upload/upload';

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
  const [show, setShow] = useState(false);

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
        console.log(items);
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };

  const renderOption = (item: DataSourceType) => {
    // const itemWithlakers= item as DataSourceType<LakerPlayerProps>
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      // <>
      //   <h2>Name: {itemWithlakers.value}</h2>
      //   <p>number: {itemWithlakers.number}</p>
      // </>
      <>
       <h2>Name: {itemWithGithub.login}</h2>
       <p>url: {itemWithGithub.url}</p>
      </>
      // 这样写的话，item要写any
      // <>
      //   <h2>Name: {item.login}</h2>
      //   <p>url: {item.url}</p>
      // </>
    )
  }

  // 单文件上传
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const uploadfile = files[0];
    const formdata = new FormData();
    formdata.append("image", uploadfile);

    axios({
      url: "https://jsonplaceholder.typicode.com/posts",
      // url: "http://localhost:4000/manage/img/upload",
      method: "post",
      data: formdata,
      // headers: {
      //   "content-type": "multipart/form-data",
      // },
    }).then(res => {
      console.log(res);
    });

    //   request({
    //     url: "https://jsonplaceholder.typicode.com/posts",
    //     method: "post",
    //     data: formdata
    //   }).then((response: any) => {
    //     console.log(response);
    //   })
  };

  // 多文件上传: 1) 一次请求多文件 2) 多次请求多文件
  const handleChangem = (e: MouseEvent<HTMLButtonElement>) => {
    const filesdom = document.getElementById("imagem") as HTMLInputElement;
    const files = filesdom.files;
    console.log(files);
    if (!files) return;
    
    // 一次请求多文件上传，即一次请求上传多个文件
    // const formdata = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //     formdata.append("imagem", files[i]);
    // }
    // axios({
    //     // url: "https://jsonplaceholder.typicode.com/posts",
    //     url: "http://localhost:4000/manage/img/uploadm",
    //     method: "post",
    //     data: formdata,
    //     //headers: {
    //     //    "content-type": "multipart/form-data",
    //     //},
    // }).then(res => {
    //     console.log(res);
    // });

    // 多文件多请求上传，即一次请求发一个，后端也可单文件处理
    for (let i = 0; i < files.length; i++) {
      const formdata = new FormData();
      formdata.append("imagem", files[i]);

      axios({
        // url: "https://jsonplaceholder.typicode.com/posts",
        url: "http://localhost:4000/manage/img/uploadm",
        method: "post",
        data: formdata,
        // headers: {
        //   "content-type": "multipart/form-data",
        // },
      }).then(res => {
        console.log(res);
      });
    }

    //   request({
    //     url: "https://jsonplaceholder.typicode.com/posts",
    //     method: "post",
    //     data: formdata
    //   }).then((response: any) => {
    //     console.log(response);
    //   })
  };

  const handleBeforeUpload = (file: File) => {
    if (Math.round(file.size / 1024) > 100) {
      alert("file is too big!")
      return false
    }
    return true
  }

  const handleBeforeUploadPromise = (file: File) => {
    let newFile = new File([file], "new_name.docx", {type: file.type})
    return Promise.resolve(newFile)
  }

  const defaultFileList: UploadFile[] = [
    {
      uid: "111",
      size: 1234,
      name: "hello.md",
      status: "uploading",
      percent: 25
    },
    {
      uid: "211",
      size: 2234,
      name: "hello2.md",
      status: "success",
      percent: 35
    },
    {
      uid: "311",
      size: 3874,
      name: "hello3.md",
      status: "error",
      percent: 65
    }
  ]

  return (
    <div>
      <AutoComplete
        onSuggest={handleFetch}
        onSelect={() => {
          console.log("select");
        }}
        // renderOption={renderOption}
      />
      <hr />
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
      <Button btnType="danger" size="sm">
        hello-danger
      </Button>
      <hr />
      <Button
        btnType="link"
        size="lg"
        href="https://www.baidu.com"
        target="_blank"
      >
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
      <Menu defaultIndex="0" onSelect={() => {}}>
        <MenuItem>aaa</MenuItem>
        <SubMenu title="ddd">
          <MenuItem>eee</MenuItem>
          <MenuItem>fff</MenuItem>
          <MenuItem>ggg</MenuItem>
        </SubMenu>
        <MenuItem>
          <a href="https://www.qq.com" target="_blank">
            bbb
          </a>
        </MenuItem>
        <MenuItem disabled>ccc</MenuItem>
      </Menu>
      <Menu defaultIndex="1-2" mode="vertical" defaultOpenSubMenus={["1"]}>
        <MenuItem>aaa</MenuItem>
        <SubMenu title="vvvv">
          <MenuItem>veee</MenuItem>
          <MenuItem>vfff</MenuItem>
          <MenuItem>vggg</MenuItem>
        </SubMenu>
        <MenuItem>ccc</MenuItem>
      </Menu>
      <hr />
      <hr />
      <hr />
      <Button
        btnType="primary"
        onClick={() => {
          setShow(!show);
        }}
      >
        测试Transition
      </Button>
      <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
        <div>
          <p>ffewfewgewgewgegergerg个然后让他忽然他</p>
          <p>ffewfewgewgewgegergerg个然后让他忽然他</p>
          <p>ffewfewgewgewgegergerg个然后让他忽然他</p>
        </div>
        <Button btnType="danger" size="sm">
          感叹号！
        </Button>
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
      {/* 1.传统form表单文件上传 */}
      <div>
        <form
          encType="multipart/form-data"
          action="https://jsonplaceholder.typicode.com/posts"
          // action="http://localhost:4000/manage/img/upload"
          method="post"
        >
          <input type="file" name="image" id="image"/>
          <button type="submit">Submit</button>
        </form>
      </div>
      <hr />
      {/* (重点！)2.使用ajax文件上传 */}
      <div>
        <input type="file" name="image" id="image" onChange={handleChange} />
      </div>
      <hr />
      {/* (重点！)3.使用ajax多文件上传，input的file文件多选是一次性选多个文件，而不是选一个确定后再选另一个！ */}
      <div>
        <input type="file" name="imagem" id="imagem" multiple />
        <button onClick={handleChangem}>Submit</button>
      </div>
      <hr />
      <hr />
      <Upload
        action="https://jsonplaceholder.typicode.com/posts"
        // action="http://localhost:4000/manage/img/upload"
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        defaultFileList={defaultFileList}
        onSuccess={(data)=>{console.log(data)}}
        onError={(err)=>{console.log(err)}}
        onProgress={(percentage)=>{console.log("进度：" + percentage)}}
        onPreview={(file) => { console.log("onPreview" + file.name); }}
        onChange={(file)=>{console.log("onChange" + file.name);}}
        // drag
        // onBeforeUpload={handleBeforeUpload}
        // onBeforeUpload={handleBeforeUploadPromise}
      > 
        {/* 拖拽示例 */}
        {/* <Icon icon="upload" size="5x" theme="secondary" /> */}
        {/* <br/> */}
        {/* <p>Drag file over to upload</p> */}
        {/* 正常上传按钮 */}
        <Button btnType="primary">Upload Files</Button>
      </Upload>
    </div>
  );
}

export default App;
