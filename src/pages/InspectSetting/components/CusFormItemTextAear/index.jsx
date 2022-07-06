import React from "react";

import { Input } from "antd";
const { TextArea } = Input;
// 表单元素-文本输入区域
const CusFormItemTextAear = (props) => {
	const onChange = (e) => {
		props.onChange(e.target.value);
	};

	return (
		<TextArea
			value={props.value}
			onChange={onChange}
			placeholder={props.placeholder || "请输入..."}
			maxLength={props.maxLength || 200}
			// autoSize={{
			// 	minRows: props.minRows || 4,
			// 	maxRows: props.maxRows || 6,
			// }}
			style={{
				width: props.width || "100%",
				fontSize: 14,
				wordBreak: "break-all",
				...props.style,
				maxHeight: 160,
			}}
		/>
	);
};

export default CusFormItemTextAear;
