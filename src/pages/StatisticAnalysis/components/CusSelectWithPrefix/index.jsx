import React, { useState } from "react";
import styles from "./index.module.scss";
import { Select } from "antd";
import downImg from "@/assets/download.png";

const { Option } = Select;

// 我负责的
const CusSelectWithPrefix = (props) => {
	return (
		<div
			style={{
				width: props.width || "100%",
				// height: props.size && props.size === "middle" ? 32 : 40,
			}}
			className={styles.cusSelectWithPrefix}
		>
			{props.prefix !== null ? props.prefix : null}
			<Select
				value={props.value}
				onSelect={(e) => props.onChange(e)}
				size={props?.size ?? "large"}
				style={{
					flex: 1,
					fontSize: props?.fontSize ?? 14,
					color: "#2b2b2b",
				}}
				bordered={false}
				suffixIcon={<img src={downImg} alt="" />}
			>
				{props?.options?.map((item) => (
					<Option key={item.value} value={item.value}>
						{item.label}
					</Option>
				))}
			</Select>
		</div>
	);
};

export default CusSelectWithPrefix;
