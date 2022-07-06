import React, { useState, useEffect, useMemo, useCallback } from "react";
import ChartBox from "../../HOC/ChartBox";
import ChartComp from "../../components/ChartComp";
// import styles from "./index.module.scss";
import cloneDeep from "lodash/cloneDeep";
import { getProjectProblemRankRequest } from "../../data-source/async";
import option from "../../constant/projectProblemRankOptions";
const ProjectProblemRankChart = () => {
	const [data, setData] = useState(null);

	const chartOptions = useMemo(() => {
		const options = cloneDeep(option);
		if (data) {
			options.yAxis[0].data = [...data.name];
			options.series[0].data = [...data.unfixed];
			options.series[1].data = [...data.fixed];
			options.series[2].data = [...data.closed];
		}
		return options;
	}, [data]);
	const getData = useCallback(async (params) => {
		const list = await getProjectProblemRankRequest(params);
		console.log(list);
		let name = [],
			unfixed = [],
			fixed = [],
			closed = [];
		if (list && list.length) {
			list.forEach((item) => {
				name.push(item.projectName);
				unfixed.push(item.unfixed);
				fixed.push(item.fixed);
				closed.push(item.closed);
			});
		}
		setData(() => ({
			name,
			unfixed,
			fixed,
			closed,
		}));
	}, []);
	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<>
			{ChartBox("项目检查问题排行榜")({ label: "单位", value: "个" })()(
				chartOptions
			)(ChartComp)}
		</>
	);
};

export default ProjectProblemRankChart;
