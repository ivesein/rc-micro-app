import React, {forwardRef, useContext} from 'react';
import {JJSKUpload} from "jjsk-common-web";
import {commonTitleWrapperWithRef} from "../../../../../components/HOC/PannelWithTitle";
import {InspectFormContext} from "../../../context";
import xApi from "../../../../../utils/xApi";
import './index.scss';

const RelateAttachment = () => {
    const formService = useContext(InspectFormContext);
    return (
        <div className="realte-attachment-box">
            <JJSKUpload
                xApi={xApi} // 用于将文件上传至文件服务器
                ref={formService.uploadRef} // 用于获取上传和操作后最终文件列表数据
                {...(formService.mode === 'edit' && {files: formService.fileList})}
            />
        </div>
    );
};

export default forwardRef(commonTitleWrapperWithRef(RelateAttachment)('相关附件'));