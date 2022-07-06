import React, { useState, useEffect } from "react";
import { Table } from "antd";
import sizeMe from "react-sizeme";
import "./index.scss";
const CusTable = (props) => {
	const [scroll, setScroll] = useState({});
	useEffect(() => {
		const { width, height } = props.size;
		let cHeight = handleTableHeight();
		let fixHeight = props?.thHeight ?? 56;
		if (cHeight > height - fixHeight + 10) {
			setScroll({
				x: width - 20,
				y: height - fixHeight,
			});
		} else {
			setScroll({
				x: width - 20,
			});
		}
	}, [props.dataSource, props.size]);
	// 处理表格高度
	const handleTableHeight = () => {
		let ele = document.getElementsByClassName("ant-table-tbody");
		let height = 0;
		let summaryHeight = 0;

		if (ele && ele.length > 0) {
			height =
				document?.getElementsByClassName("ant-table-tbody")[
					props.tableIndex || 0
				]?.clientHeight;
		}
		let summaryEl = document.getElementsByClassName("ant-table-summary");
		if (summaryEl && summaryEl.length) {
			summaryHeight =
				document?.getElementsByClassName("ant-table-summary")[
					props.tableIndex || 0
				]?.clientHeight;
		}
		return height + summaryHeight;
	};
	const rowSelection = {
		selectedRowKeys: props.selectedRowKeys || [],
		onChange: props.onSelectChange || null,
	};
	// const onRow = (record) => {
	// 	return {
	// 		onMouseEnter: (event) => {
	// 			setHoverRowId(record.id);
	// 			// props?.setHoverRowId(record.id);
	// 		}, // 鼠标移入行
	// 		onMouseLeave: (event) => {
	// 			setHoverRowId(null);
	// 			// props?.setHoverRowId(null);
	// 		},
	// 	};
	// };
	return (
		<div className="cus-table-basis-wrap">
			<Table
				components={props.components || null}
				key={`table-${props.dataSource && props.dataSource.length}`}
				scroll={scroll}
				defaultExpandAllRows={props.expandable}
				loading={props.loading}
				pagination={false}
				rowSelection={props.config.showSelection ? rowSelection : null}
				rowKey={props.config.rowKey || "id"}
				bordered={props.config.bordered}
				columns={props.columns}
				// onRow={onRow}
				// rowClassName={(record, index) => {
				// 	let className = "";
				// 	// className = index % 2 === 0 ? "oddRow" : "evenRow"
				// 	className =
				// 		record.id === hoverRowId ? "cus-row-high-light" : "";

				// 	return className;
				// }}
				// defaultExpandedRowKeys={['1']} //默认展开第几层级数据
				expandIconColumnIndex={
					props.config.expandIconColumnIndex
						? props.config.expandIconColumnIndex
						: 1
				}
				dataSource={props.dataSource}
				summary={props.summary || null}
			/>
		</div>
	);
};
export default sizeMe({ monitorHeight: true })(CusTable);
