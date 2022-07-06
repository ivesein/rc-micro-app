import React, { useState, useEffect, useMemo, useCallback } from "react";
import ChartBox from "../../HOC/ChartBox";
import CusSelectWithPrefix from "../../components/CusSelectWithPrefix";
import ChartComp from "../../components/ChartComp";
// import styles from "./index.module.scss";
import cloneDeep from "lodash/cloneDeep";
import {
	getProjectListRequest,
	getProjectProblemRequest,
} from "../../data-source/async";
import option from "../../constant/projectProblemOptions";
const ProjectProblemChart = () => {
	const [data, setData] = useState(null);
	const [cProjectId, setCProjectId] = useState(null);
	const [projectsOptions, setProjectsOptions] = useState([]);

	const chartOptions = useMemo(() => {
		const options = cloneDeep(option);
		if (data) {
			options.xAxis.data = [...data.name];
			options.series[0].data = [...data.unchecked];
			options.series[1].data = [...data.checked];
		}
		return options;
	}, [data]);
	const getData = useCallback(async (params) => {
		const list = await getProjectProblemRequest(params);
		console.log(list);
		let name = [],
			checked = [],
			unchecked = [];
		if (list && list.length) {
			list.forEach((item) => {
				name.push(item.type);
				checked.push(item.checked);
				unchecked.push(item.unchecked);
			});
		}
		setData(() => ({
			name,
			checked,
			unchecked,
		}));
	}, []);
	useEffect(() => {
		getProjectList();
	}, []);
	useEffect(() => {
		if (cProjectId) {
			getData({ projectId: cProjectId });
		}
	}, [cProjectId, getData]);

	const getProjectList = async () => {
		const list = await getProjectListRequest();
		console.log(list);
		if (list && list.length) {
			setCProjectId(list[0].id);
			setProjectsOptions(
				list.map((item) => ({
					label: item.projectName,
					value: item.id,
				}))
			);
		}
	};

	const onChange = useCallback((value) => {
		console.log("CusSelectWithPrefix onChange>>>", value);
		setCProjectId(value);
	}, []);
	return (
		<>
			{ChartBox("项目问题分布")({ label: "单位", value: "个数" })(
				<CusSelectWithPrefix
					value={cProjectId}
					size="middle"
					width={220}
					options={projectsOptions}
					onChange={onChange}
				/>
			)(chartOptions)(ChartComp)}
		</>
	);
};

export default ProjectProblemChart;
