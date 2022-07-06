import React from "react";

import { Input } from "antd";
// 表单元素-文本输入区域
const CusFormItemInput = (props) => {
	const onChange = (e) => {
		props.onChange(e.target.value);
	};
	return (
		<Input
			size="large"
			value={props.value || ""}
			onChange={onChange}
			maxLength={props.maxLength}
			placeholder={props.placeholder || "请输入"}
			disabled={props.disabled}
			suffix={props.suffix || null}
			style={{
				fontSize: 14,
				color: "#2b2b2b",
				width: props.width || "100%",
			}}
		/>
	);
};

export default CusFormItemInput;
