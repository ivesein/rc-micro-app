import React from "react";
import styles from "./index.module.scss";
import InspectTypeChart from "./views/InspectTypeChart";
// import QualityInspectionStatisticsChart from "./views/QualityInspectionStatisticsChart";
// import ProjectProblemChart from "./views/ProjectProblemChart";
import ProjectProblemRankChart from "./views/ProjectProblemRankChart";

const StatisticAnalysis = () => {
	return (
		<div className={styles.statisitc}>
			<div className={styles.content}>
				<div className={styles.gridWrapper}>
					<div className={styles.chartItem}>
						<InspectTypeChart />
					</div>
					<div className={styles.chartItem}>
						<ProjectProblemRankChart />
					</div>
					{/* <div className={styles.chartItem}>
						<QualityInspectionStatisticsChart />
					</div>
					<div className={styles.chartItem}>
						<ProjectProblemChart />
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default StatisticAnalysis;
