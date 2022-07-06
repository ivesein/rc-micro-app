import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
const ChartComp = ({ option }) => {
	const chartElRef = useRef(null);
	const chartInsRef = useRef(null);
	const resizeObserver = new ResizeObserver((entries) => {
		chartInsRef?.current.resize(); //当dom发生大小改变就重置echart大小
	});
	useEffect(() => {
		initChart();
		resizeObserver.observe(chartElRef.current); //通过resizeObserver观察echart对应的item实例对象
	}, []);

	useEffect(() => {
		if (chartInsRef.current) {
			chartInsRef.current.setOption(option);
		}
	}, [option]);

	const initChart = (el) => {
		if (chartElRef.current) {
			chartInsRef.current = echarts.init(chartElRef.current);
		}
	};
	return <div ref={chartElRef} style={{ flex: 1, minWidth: "520px" }}></div>;
};

export default ChartComp;
