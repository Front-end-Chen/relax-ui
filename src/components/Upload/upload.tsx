import axios from "axios";
import React, { useRef, ChangeEvent, useState } from "react";
import Dragger from './dragger';
import UploadFileList from './uploadFileList';

// 声明文件状态类型
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

// 声明上传文件的状态对象的类型，用于UI显示
export interface UploadFile {
  // 文件唯一的标识
  uid: string;
  // 上传的文件大小
  size: number;
  // 上传的文件名
  name: string;
  // 文件状态的标识
  status?: UploadFileStatus;
  // 上传进度百分比
  percent?: number;
  // 文件原生的File对象
  originFile?: File;
  // 文件上传成功返回的数据
  response?: any;
  // 文件上传失败返回的错误信息
  error?: any;
}

export interface UploadProps {
  // 上传文件请求的url
  action: string;
  // 设置初始化的UploadFileList
  defaultFileList?: UploadFile[];
  // 文件上传进度条的回调
  onProgress?: (percentage: number, file: UploadFile) => void;
  // 文件上传成功的回调
  onSuccess?: (data: any, file: UploadFile) => void;
  // 文件上传出错的回调
  onError?: (error: any, file: UploadFile) => void;
  // 文件上传之前的回调
  onBeforeUpload?: (file: File) => boolean | Promise<File>;
  // 删除UploadFileList中的UploadFile的回调
  onChange?: (file: UploadFile) => void;
  // 删除UploadFileList中的UploadFile的回调
  onRemove?: (removeFile: UploadFile) => void;
  // 点击文件列表的文件名触发的回调
  onPreview?: (clickFile: UploadFile) => void;
  // 添加额外的请求头
  headers?: {[key: string]: any };
  // 提交文件数据在FormData中对应的key，用于后端根据key获取file
  formDataKey?: string;
  // 添加额外的文件数据到FormData中
  extraFormData?: {[key: string]: any };
  // 是否携带cookie
  withCredentials?: boolean;
  // 设置允许上传的文件格式
  accept?: string;
  // 是否开启多文件上传
  multiple?: boolean;
  // 是否开启拖拽上传
  drag?: boolean;
}

const Upload: React.FC<UploadProps> = ({
  action,
  defaultFileList=[],
  onSuccess,
  onError,
  onProgress,
  onBeforeUpload,
  onChange,
  onRemove,
  onPreview,
  headers,
  formDataKey="file",
  extraFormData,
  withCredentials,
  accept,
  multiple,
  drag,
  children
}) => {
  // 上传文件UploadFile的list
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>(defaultFileList)
  // fileInput的ref，用来触发fileInput点击事件，从而选择文件
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 更新UploadFileList中的UploadFile的状态属性
  const updateUploadFileList = (updateFile: UploadFile, updateObject: Partial<UploadFile>) => {
    setUploadFileList(preList => {
      return preList.map(file => {
        if (file.uid === updateFile.uid) {
          return {...file, ...updateObject}
        } else {
          return file
        }
      })
    })
  }

  // 点击触发选择文件的回调
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // fileInput改变触发文件上传的回调
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // 删除UploadFileList的中的UploadFile，并删除相应的上传进度信息
  // 用户可在删除后，在onRemove回调中做一些操作
  const handleRemove = (removeFile: UploadFile) => {
    setUploadFileList(preList => {
      return preList.filter(file => file.uid !== removeFile.uid)
    })
    if (onRemove) {
      onRemove(removeFile)
    }
  }

  // 点击文件列表的文件名触发的回调
  const handlePreview = (clickFile: UploadFile) => {
    if (onPreview) {
      onPreview(clickFile)
    }
  }

  // 文件上传处理函数-使用多次请求多文件上传的方式
  const uploadFiles = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      if (!onBeforeUpload) {
        upload(files[i]);
      } else {
        let result = onBeforeUpload(files[i])
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            upload(processedFile)
          })
        } else if (result !== false){
          upload(files[i])
        }
      }
    }
  };

  // 文件上传发请求函数
  const upload = (file: File) => {
    let uploadFile: UploadFile = {
      uid: Date.now() + "upload-file",
      name: file.name,
      size: file.size,
      status: "ready",
      percent: 0,
      originFile: file,
    }
    // 注意要使用函数，以为文件上传是异步的
    setUploadFileList(preList => {
      return [uploadFile, ...preList]
    })

    let formData = new FormData();
    formData.append(formDataKey, file);

    // 添加额外的文件数据到FormData中
    if (extraFormData) {
      Object.keys(extraFormData).forEach(key => {
        formData.append(key, extraFormData[key])
      })
    }

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "content-type": "multipart/form-data",
        },
        // 监听文件上传进度的函数，原理是给xhr.upload.progress绑定函数
        onUploadProgress: e => {
          // round为四舍五入取整
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            // 根据上传进度，实时更新UploadFile的状态属性
            updateUploadFileList(uploadFile, {status: "uploading", percent: percentage})
            if (onProgress) {
              onProgress(percentage, uploadFile);
            }
          }
        },
        withCredentials
      })
      .then(res => {
        // 更新UploadFile的状态属性
        updateUploadFileList(uploadFile, {status: "success", response: res.data})
        if (onSuccess) {
          onSuccess(res.data, uploadFile);
        }
        if (onChange) {
          onChange(uploadFile);
        }
      })
      .catch(error => {
        // 更新UploadFile的状态属性
        updateUploadFileList(uploadFile, {status: "error", error})
        if (onError) {
          onError(error, uploadFile);
        }
        if (onChange) {
          onChange(uploadFile);
        }
      });
  };

  return (
    <div className="relax-upload-component">
      <div 
        className="relax-upload-input"
        onClick={handleClick}>
        {drag ? 
          <Dragger onFile={(files) => { uploadFiles(files) }}>
            {children}
          </Dragger>:
          children
        }
        <input
          className="relax-file-input"
          type="file"
          ref={inputRef}
          onChange={handleChange}
          accept={accept}
          multiple={multiple}
          />
      </div>

      <UploadFileList
        uploadFileList={uploadFileList}
        onRemove={handleRemove}
        onPreview={handlePreview}
      />
    </div>
  );
};

export default Upload;
