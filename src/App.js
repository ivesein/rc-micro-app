import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ProjectDo from "./pages/ProjectDo"; // 交付管理

export default class App extends Component {
	render() {
		return (
			<BrowserRouter
				basename={
					// window.__POWERED_BY_QIANKUN__
					// 	? "/apps/project_new"
					// 	: "/apps/project_new"
					"/apps/project_new/index"
				}
			>
				<Switch>
					<Route
						exact
						path="/apps/project_new/index"
						render={() => <Redirect to="/project_do"></Redirect>}
					></Route>
					<Route path="/project_do" component={ProjectDo} />
				</Switch>
			</BrowserRouter>
		);
	}
}
