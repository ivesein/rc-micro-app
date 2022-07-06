import React from "react";
import styles from "./index.module.scss";
const chartBoxWrapper =
	(chartTitle) =>
	(unitInfo) =>
	(FilterComponent) =>
	(chartOptions) =>
	(ChartComponent) => {
		return (
			<div className={styles.chartBox}>
				<div className={styles.title}>{chartTitle}</div>
				<div className={styles.filterBar}>
					{unitInfo && (
						<div className={styles.unit}>
							<span className={styles.unitLabel}>
								{unitInfo.label}：
							</span>
							<span className={styles.unitValue}>
								{unitInfo.value}
							</span>
						</div>
					)}

					{/* <div className={styles.unit}>{FilterComponent()}</div> */}
					{FilterComponent}
				</div>
				<ChartComponent option={chartOptions} />
			</div>
		);
	};
export default chartBoxWrapper;
