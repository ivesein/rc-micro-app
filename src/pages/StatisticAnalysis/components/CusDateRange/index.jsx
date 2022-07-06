import React from "react";
import { DatePicker } from "antd";
import styles from "./index.module.scss";
// import moment from "moment";
const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";
// 表单元素-日期选择
const CusDateRange = (props) => {
	const onChange = (date, dateString) => {
		props.onChange(dateString);
	};

	return (
		<RangePicker
			getPopupContainer={(trigger) => trigger.parentNode}
			// value={
			// 	props.value
			// 		? [moment(props.value[0]), moment(props.value[1])]
			// 		: ["", ""]
			// }
			allowClear={props.allowClear}
			format={dateFormat}
			size={props.size || "large"}
			className={styles.cusFormItemDateSelect}
			style={{ width: props.width || "100%" }}
			onChange={onChange}
		/>
	);
};

export default CusDateRange;
