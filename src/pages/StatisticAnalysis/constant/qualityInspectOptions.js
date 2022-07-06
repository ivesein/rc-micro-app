const qualityInspectOptions = {
	title: {
		show: false,
	},
	legend: {
		show: false,
	},
	tooltip: {
		show: true,
		confine: true,
		// alwaysShowContent: true,
	},
	color: ["#7398f7"],
	grid: {
		left: "25px",
		right: "6%",
		top: "15px",
		bottom: "20px",
		containLabel: true,
	},
	xAxis: {
		type: "value",
		show: true,
		position: "bottom",
		axisTick: {
			show: true,
		},
		axisLine: {
			show: false,
			lineStyle: {
				color: "#fff",
			},
		},
		axisLabel: {
			color: "#666",
			fontSize: 14,
			margin: 14,
		},
		splitLine: {
			show: true,
		},
		data: [0, 2000, 4000, 6000, 8000, 10000, 12000],
	},
	yAxis: {
		type: "category",
		axisTick: {
			show: false,
			alignWithLabel: false,
			length: 5,
		},
		splitLine: {
			//网格线
			show: false,
		},
		inverse: "true", //排序
		axisLine: {
			show: true,
			lineStyle: {
				color: "rgba(43, 43, 43, 0.2)",
			},
		},
		axisLabel: {
			color: "#666",
			fontSize: 12,
			margin: 10,
			// rotate: 45,
			formatter: (value) =>
				value?.length > 7 ? value.slice(0, 7) + "..." : value,
		},
		data: [],
	},
	series: [
		{
			name: "",
			type: "bar",
			label: {
				normal: {
					show: false,
					position: "right",
					formatter: function (params) {
						// console.log(params);
						return params?.value ?? "0";
						// return numbro(params?.value ?? "0").format({
						// 	// currencySymbol: "￥",
						// 	thousandSeparated: true,
						// 	mantissa: 2,
						// });
					}, //"{c}",
					textStyle: {
						color: "#666", //color of value
					},
				},
			},
			barMaxWidth: 32,
			itemStyle: {
				barBorderRadius: 0,
				borderWidth: 0,
				borderColor: "#333",
			},
			barGap: "0%",
			barCategoryGap: "50%",
			data: [],
		},
	],
};
export default qualityInspectOptions;
