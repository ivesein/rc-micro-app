import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainApplication from "../MainApplication";

const ProjectDo = () => {
	return (
		<div style={{ height: 50 }}>123123123213</div>
		// <>
		// 	<Switch>
		// 		<Route
		// 			exact
		// 			path="/project_do"
		// 			render={() => <Redirect to="/project_do/main_page" />}
		// 		/>
		// 		<Route
		// 			path="/project_do/main_page"
		// 			component={MainApplication}
		// 		/>
		// 	</Switch>
		// </>
	);
};

export default ProjectDo;
