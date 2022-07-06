import React, { useState, useEffect, useMemo, useCallback } from "react";
import ChartBox from "../../HOC/ChartBox";
// import CusDateRange from "../../components/CusDateRange";
import ChartComp from "../../components/ChartComp";
import styles from "./index.module.scss";
import cloneDeep from "lodash/cloneDeep";
import option from "../../constant/inspectionTypeOption";
import { getInspectTypeDistributionRequest } from "../../data-source/async";

const InspectTypeChart = () => {
	const formatter = useCallback((params) => {
		var result = `<div class=${styles.cusTooltip}>
            <span class=${styles.title}>${params.name}</span>
            <span><span class=${styles.value}>${params.value}个</span><span class=${styles.percent}>${params.percent}%</span></span>
        </div>`;
		return result;
	}, []);
	const [data, setData] = useState([]);
	const chartOptions = useMemo(() => {
		const options = cloneDeep(option);
		options.tooltip.formatter = formatter;
		options.legend.data = data.map((item) => item.name);
		options.series[0].data = [...data];
		return options;
	}, [data, formatter]);
	const getData = useCallback(async (params) => {
		const list = await getInspectTypeDistributionRequest(params);
		let arr = [];
		if (list && list.length) {
			list.forEach((item) => {
				arr.push({
					name: item.typeName,
					value: item.value,
				});
			});
		}
		setData(() => arr);
	}, []);
	useEffect(() => {
		getData();
	}, [getData]);
	// const onChange = useCallback(
	// 	(value) => {
	// 		console.log("CusDateRange onChange>>>", value);
	// 		const [start, end] = value || [];
	// 		getData({ start, end });
	// 	},
	// 	[getData]
	// );
	return (
		<>
			{ChartBox("检查类型分布")({ label: "单位", value: "%" })()(
				// <CusDateRange
				// 	allowClear={true}
				// 	size="middle"
				// 	width={220}
				// 	onChange={onChange}
				// />
				chartOptions
			)(ChartComp)}
		</>
	);
};

export default InspectTypeChart;
