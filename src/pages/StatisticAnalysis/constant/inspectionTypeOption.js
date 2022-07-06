const inspectionTypeOption = {
	title: {
		show: false,
		text: "暂时没有数据",
		x: "center",
		y: "46%",
		textStyle: {
			color: "#999",
			fontSize: 13,
			fontWeight: 100,
		},
	},
	legend: {
		show: true,
		type: "scroll",
		bottom: "15px",
		width: "480px",
		height: "40px",
		orient: "horizontal",
		itemGap: 20,
		icon: "rect",
		itemWidth: 14,
		itemHeight: 14,
		data: [],
	},
	tooltip: {
		show: true,
	},
	color: ["#f1883d", "#245ff2", "#4f7ff4", "#7398f7", "#a7bffa", "#dbe5fd"],
	grid: {
		left: "2%",
		right: "2%",
		top: "15px",
		bottom: "50px",
		containLabel: true,
	},
	series: [
		{
			// name: "",
			type: "pie",
			hoverAnimation: false,
			startAngle: -180,
			endAngle: 180,
			label: {
				show: true,
				formatter: "{a|{b}}: {d|{d}}%",
				padding: [0, 0],
				// backgroundColor: "#f4f4f4",
				rich: {
					a: {
						color: "#666666",
						fontSize: "14px",
						// lineHeight: 30,
						verticalAlign: "middle",
					},
					d: {
						color: "#666666",
						fontSize: "14px",
						// lineHeight: 30,
						verticalAlign: "middle",
					},
				},
				// position: "center",
			},
			labelLine: {
				show: false,
				length: "15px",
				length2: "0px",
				lineStyle: {
					width: 0.5,
					color: "#999",
				},
			},
			// labelLayout: {
			// 	dy: -2,
			// 	dx: -20,
			// 	align: "left",
			// 	verticalAlign: "bottom",
			// },
			radius: ["0%", "50%"],
			center: ["50%", "45%"],
			data: [],
			emphasis: {
				scale: true,
				scaleSize: 10,
				itemStyle: {
					borderColor: "#ffffff",
					borderWidth: 4,
				},
				// label: {
				// 	show: false,
				// 	formatter: ["{a|{b}}", `{b|￥}{c|{c}}`].join("\n"),
				// },
			},
			itemStyle: {
				borderColor: "#ffffff",
				borderWidth: 2,
			},
		},
	],
};
export default inspectionTypeOption;
