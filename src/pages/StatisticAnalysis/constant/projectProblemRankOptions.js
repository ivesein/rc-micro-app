const projectProblemRankOptions = {
	legend: {
		type: "plain",
		bottom: "15px",
		orient: "horizontal",
		itemGap: 20,
		icon: "rect",
		itemWidth: 14,
		itemHeight: 14,
	},
	// color: colorList,
	tooltip: {
		trigger: "axis",
		axisPointer: {
			type: "shadow",
		},
		textStyle: {
			borderWidth: 128,
		},
		// formatter:'{b0}<br />{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}%<br />'
		formatter: function (params) {
			console.log(params);
			var result =
				'<div style="width:auto"><p style="max-width:200px;height:auto;overflow:hidden;word-break: break-all;white-space: break-spaces;">' +
				params[0]?.name +
				"</p></div>";
			for (var i = params.length - 1; i > -1; i--) {
				result +=
					`<span style='display:inline-block;margin-right:4px;width:10px;height:10px;;font-size:12px;background-color:${params[i].color}'></span>` +
					" " +
					`<span style="display:inline-block;min-width:40px;">${
						params[i]?.seriesName ?? ""
					}</span>` +
					"&nbsp;&nbsp;" +
					params[i].data +
					"<br>";
			}
			return result;
		},
	},
	grid: {
		left: "25px",
		right: "6%",
		top: "15px",
		bottom: "55px",
		containLabel: true,
	},
	xAxis: [
		{
			type: "value",
			// boundaryGap: true,
			axisLine: {
				// onZero: true,
				lineStyle: {
					color: "#bfbfbf",
				},
			},
			axisTick: {
				show: true,
				alignWithLabel: true,
				// length: 5,
			},
			axisLabel: {
				fontSize: 12,
				color: "#666",
				margin: 14,
			},
			// interval: 1,
		},
	],
	yAxis: [
		{
			// min: 5,
			// splitNumber: 20,
			// minInterval: 20,
			type: "category",
			axisLine: {
				show: true,
				lineStyle: {
					color: "#bfbfbf",
				},
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: false,
			},
			axisLabel: {
				fontSize: 14,
				color: "#666",
				// rotate: 45,
				formatter: (value) =>
					value?.length > 7 ? value.slice(0, 7) + "..." : value,
			},
			data: [],
		},
	],
	series: [
		{
			name: "待整改",
			data: [],
			type: "bar",
			stack: "total",
			barMaxWidth: 24,

			itemStyle: {
				color: "#ed6a0c",
				// shadowColor: "#ed6a0c",
			},
			// emphasis: {
			// 	label: {
			// 		rotate: 90,
			// 		formatter: "{c}",
			// 	},
			// },
			// backgroundStyle: {
			// 	shadowColor: "red",
			// 	shadowBlur: 10,
			// },
		},
		{
			name: "已整改",
			type: "bar",
			stack: "total",
			data: [],
			// barMaxWidth: 24,
			//
			itemStyle: {
				color: "#f9b483",
				// shadowColor: "#ed6a0c",
			},
		},
		{
			name: "已关闭",
			type: "bar",
			stack: "total",
			data: [],
			// barMaxWidth: 24,
			//
			itemStyle: {
				color: "#fde6d6",
				// shadowColor: "#ed6a0c",
			},
		},
	],
};
export default projectProblemRankOptions;
