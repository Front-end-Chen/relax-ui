import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Icon } from '../Icon/icon';
import { Button } from '../Button/button';
import { Upload, UploadFile } from "./upload";

export default {
  title: "Upload",
  component: Upload,
} as ComponentMeta<typeof Upload>;

export const UploadSimple: ComponentStory<typeof Upload> = () => {

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

  const handleBeforeUpload = (file: File) => {
    if (Math.round(file.size / 1024) > 100) {
      alert("file is too big!")
      return false
    }
    return true
  }

  return (
    <>
     <Upload
        action="https://jsonplaceholder.typicode.com/posts"
        defaultFileList={defaultFileList}
        onSuccess={(data)=>{console.log(data)}}
        onError={(err)=>{console.log(err)}}
        onProgress={(percentage)=>{console.log("进度：" + percentage)}}
        onPreview={(file) => { console.log("onPreview" + file.name); }}
        onChange={(file)=>{console.log("onChange" + file.name);}}
        onBeforeUpload={handleBeforeUpload}
      > 
        {/* 正常上传按钮 */}
        <Button btnType="primary">Upload Files</Button>
      </Upload>
    </>
  );
};

UploadSimple.storyName = "传统Upload";

export const UploadDragger: ComponentStory<typeof Upload> = () => {

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
    <>
     <Upload
        action="https://jsonplaceholder.typicode.com/posts"
        defaultFileList={defaultFileList}
        onSuccess={(data)=>{console.log(data)}}
        onError={(err)=>{console.log(err)}}
        onProgress={(percentage)=>{console.log("进度：" + percentage)}}
        onPreview={(file) => { console.log("onPreview" + file.name); }}
        onChange={(file)=>{console.log("onChange" + file.name);}}
        drag
        onBeforeUpload={handleBeforeUploadPromise}
      > 
        {/* 拖拽示例 */}
        <Icon icon="upload" size="5x" theme="secondary" />
        <br/>
        <p>Drag file over to upload</p>
      </Upload>
    </>
  );
};

UploadDragger.storyName = "拖拽Upload";