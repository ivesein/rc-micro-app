import React from "react";
import styles from "./index.module.scss";
const InspectTypeDetail = ({ data }) => {
	const keyMap = {
		typeCode: "类型编码",
		typeName: "类型名称",
		userId: "系统预设",
		typeDesc: "相关描述",
	};
	return (
		<div className={styles.detail}>
			{Object.keys(keyMap).map((key) => (
				<div className={styles.itemWrapper}>
					<div className={styles.label}>{keyMap[key]}：</div>
					<div className={styles.info}>
						{key === "userId"
							? data[key] === "1"
								? "是"
								: "否"
							: data[key]}
					</div>
				</div>
			))}
		</div>
	);
};

export default InspectTypeDetail;
