import { saveAs } from "file-saver";
import { message } from "antd";
const isPrd = process.env.NODE_ENV === "production";
const base = isPrd ? process.env.XAPI_BASE : "http://192.168.11.118";
export const warnShow = (msg) => {
    message.warn(msg);
};

export const previewFile = (fileId, fileName) => {
    const fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
    if(!['pdf','jpg','jpeg','bmp','gif','png','svg'].includes(fileExtension?.toLowerCase())) {
        message.warn('支持图片格式和pdf格式的文件预览');
        return;
    }
    if (fileId && fileName) {
        let url =
            base +
            "/file/no_token/file/preview/" +
            fileId +
            "." +
            "*";
        window.open(url,"_blank");
    } else {
        warnShow("数据错误,刷新数据重试");
    }
};

//下载
export const downLoadFile = (fileId, fileName) => {
    if (fileId && fileName) {
        var fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
        let url =
            base +
            "/file/no_token/file/preview/" +
            fileId +
            "." +
            fileExtension;
        saveAs(url, fileId + "." + fileExtension);
    } else {
        warnShow("数据错误,刷新数据重试");
    }
};
