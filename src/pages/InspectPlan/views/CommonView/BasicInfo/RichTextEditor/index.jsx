import React, {useEffect, useState} from 'react';
import E from 'wangeditor';
import {message} from 'antd';
import debounce from 'lodash/debounce';
import {uploadImage} from "../../../../data-source/async";
import {COLOR_ITEMS, EDITOR_MENUS} from "./config";
import './index.css';

function RichTextEditor({onRef, data = ""}, ref) {
    const [editor, setEditorRef] = useState();

    useEffect(() => {
        initEditor();
        return () => {
            editor && editor.destroy();
        }
    }, []);

    const initEditor = () => {
        const editor = new E('#inspect-rich')
        setEditorRef(editor);
        initEditorEvent(editor);
    }

    const initEditorEvent = editor => {
        editor.config.onchange = editorChange;
        editor.config.menus = EDITOR_MENUS;
        editor.config.uploadImgMaxLength = 1; // 图片数量最多1张
        editor.config.showFullScreen = false;
        editor.config.colors = COLOR_ITEMS;
        editor.config.customUploadImg = uploadImg;
        editor.config.height = 200;
        editor.create();
    }

    const editorChange = debounce((newHtml) => {
        onRef && onRef(newHtml)
    }, 200)

    const uploadImg = async (resultFiles, insertImgFn) => {
        try {
            const file = resultFiles[0];
            const isLt15M = file.size / 1024 / 1024 <= 15;
            if (!isLt15M) {
                message.error("图片不能大于 15MB!");
                return;
            }
            const formData = new FormData();
            formData.append("file", file);
            const res = await uploadImage(formData);
            insertImgFn(res.result.previewUrl);
        } catch (error) {
            message.error("上传失败请稍后再试")
        }
    }

    useEffect(() => {
        editor && editor.txt.html(data);
    }, [data]);

    return (
        <div className="rich-text-editor">
            <div id='inspect-rich'/>
        </div>
    )
}

export default RichTextEditor;
