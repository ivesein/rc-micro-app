const projectProblemOptions = {
	legend: {
		type: "plain",
		bottom: "15px",
		orient: "horizontal",
		itemGap: 20,
		icon: "rect",
		itemWidth: 14,
		itemHeight: 14,
	},
	color: ["#a7bffa", "#245ff2"],
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
			// console.log(params);
			var result = `<div style="width:auto;color:#2b2b2b;font-size:14px"><p style="max-width:200px;height:auto;overflow:hidden;word-break: break-all;white-space: break-spaces;">${
				params[0]?.axisValueLabel ?? ""
			}</p></div>`;
			for (var i = params.length - 1; i > -1; i--) {
				let percent = params[i].data.realPercent + "";
				let arr = percent.split(".");
				let show = true;
				if (arr[1] && arr[1].length > 2) {
					show = false;
				}
				result += `<span style='display:inline-block;margin-right:4px;width:10px;height:10px;background-color:${
					params[i].color
				}'></span> ${params[i].seriesName}&nbsp;&nbsp;${
					show ? params[i].value : ""
				}<br>`;
			}
			return result;
		},
	},
	grid: {
		left: "25px",
		right: "4%",
		top: "20px",
		bottom: "40px",
		containLabel: true,
	},
	xAxis: {
		type: "category",
		boundaryGap: true,
		axisLine: {
			onZero: false,
			lineStyle: {
				color: "#bfbfbf",
			},
		},
		axisTick: {
			show: true,
			alignWithLabel: true,
			length: 5,
		},
		axisLabel: {
			fontSize: 12,
			color: "#666",
			margin: 14,
			rotate: 45,
			formatter: (value) =>
				value?.length > 7 ? value.slice(0, 7) + "..." : value,
		},
		data: [],
	},
	yAxis: {
		splitNumber: 5,
		minInterval: 20,
		// max: 100,
		// min: 0,
		interval: 20,
		type: "value",
		axisLine: {
			show: true,
			lineStyle: {
				color: "#bfbfbf",
			},
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: "#e9e9e9",
				type: "dashed",
			},
		},
		axisLabel: {
			fontSize: 14,
			color: "#666",
			formatter: function (value, index) {
				return value;
			},
		},
	},
	series: [
		{
			name: "待处理问题",
			type: "bar",
			stack: "total",
			data: [],
			barMaxWidth: 24,
			// barMinHeight: 400,
			itemStyle: {
				color: "#ed6a0c",
				// shadowColor: "#ed6a0c",
			},
		},
		{
			name: "已处理问题",
			data: [],
			type: "bar",
			stack: "total",
			areaStyle: {},
			barMaxWidth: 24,
			// barMinHeight: 55,
			itemStyle: {
				color: "#fbcdac",
				// shadowColor: "#ed6a0c",
			},
			emphasis: {
				label: {
					rotate: 90,
					formatter: "{c}",
				},
			},
			backgroundStyle: {
				shadowColor: "red",
				shadowBlur: 10,
			},
		},
	],
};
export default projectProblemOptions;
