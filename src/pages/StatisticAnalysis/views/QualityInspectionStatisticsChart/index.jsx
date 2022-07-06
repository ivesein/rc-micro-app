import React, { useState, useEffect, useMemo, useCallback } from "react";
import ChartBox from "../../HOC/ChartBox";
import ChartComp from "../../components/ChartComp";
import styles from "./index.module.scss";
import cloneDeep from "lodash/cloneDeep";
import option from "../../constant/qualityInspectOptions";
import { getQualityStatisticsRequest } from "../../data-source/async";
const QualityInspectionStatisticsChart = () => {
	const formatter = useCallback((params) => {
		console.log(params);
		return `<div class=${styles.cusTooltip}>
			<div class=${styles.marker}></div>
			<div class=${styles.name}>${params.name}</div>
			<span class=${styles.value}>${params.value}</span>
		</div>`;
	}, []);
	const [data, setData] = useState(null);
	const chartOptions = useMemo(() => {
		const options = cloneDeep(option);
		if (data) {
			options.tooltip.formatter = formatter;
			options.yAxis.data = [...data?.name];
			options.series[0].data = [...data?.data];
		}
		return options;
	}, [data, formatter]);
	const getData = async () => {
		const list = await getQualityStatisticsRequest();
		let name = [],
			data = [];
		if (list && list.length) {
			list.forEach((item) => {
				name.push(item.projectName);
				data.push(item.count);
			});
		}
		setData(() => ({
			name,
			data,
		}));
	};
	useEffect(() => {
		getData();
	}, []);
	return (
		<>
			{ChartBox("质量检查统计")({ label: "单位", value: "个数" })()(
				chartOptions
			)(ChartComp)}
		</>
	);
};

export default QualityInspectionStatisticsChart;
