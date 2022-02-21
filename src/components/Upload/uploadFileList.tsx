import React from "react";
import { UploadFile } from "./upload";
import { Icon } from "../Icon/icon";
import { Progress } from '../Progress/progress';

interface UploadFileListProps {
  uploadFileList: UploadFile[];
  onRemove: (removeFile: UploadFile) => void;
  onPreview: (clickFile: UploadFile) => void;
}

const UploadFileList: React.FC<UploadFileListProps> = ({
  uploadFileList,
  onRemove,
  onPreview
}) => {

  return (
    <ul className="relax-upload-list">
      {uploadFileList.map(item => {
        return (
          <li className="relax-upload-list-item" key={item.uid}>
            <span onClick={()=>{onPreview(item)}} className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === "uploading" || item.status === "ready") && (
                <Icon icon="spinner" spin theme="primary" />
              )}
              {item.status === "success" && (
                <Icon icon="check-circle" theme="success" />
              )}
              {item.status === "error" && (
                <Icon icon="times-circle" theme="danger" />
              )}
            </span>
            <span className="file-actions">
              <Icon
                icon="times"
                onClick={() => {
                  onRemove(item);
                }}
              />
            </span>
            {item.status === "uploading" && (
              <Progress percent={item.percent || 0} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadFileList;
