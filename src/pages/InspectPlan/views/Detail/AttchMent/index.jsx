import React, {useRef} from 'react';
import {JJSKUpload, NoDataSmall} from "jjsk-common-web";
import commonTitleWrapperForDetail from "../../../../../components/HOC/DetailPanelWrapper";
import xApi from "../../../../../utils/xApi";
import {adaptFileListToComponent} from "../clean-data";

const AttchMentDetail = ({detailService}) => {
    const ref = useRef();
    return (
        <div style={{minHeight: 100}}>
            {
                detailService?.detail?.file?.length > 0 ?
                    <JJSKUpload
                        xApi={xApi} // 用于将文件上传至文件服务器
                        ref={ref} // 用于获取上传和操作后最终文件列表数据
                        files={adaptFileListToComponent(detailService?.detail?.file)}  // 展示已上传的文件信息（一般用于详情、编辑时后台返回的已上传文件列表展示）
                        disabled={true}  //是否禁用上传功能
                    /> :
                    <NoDataSmall customMessage={<span>暂无数据</span>}/>
            }
        </div>
    );
};


export default commonTitleWrapperForDetail(AttchMentDetail)('相关附件');