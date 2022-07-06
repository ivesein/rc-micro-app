import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import store from "./store";
import './common/moment-config';

function render(props) {
	let elm = document.querySelector("#inspectionAppRoot");
	if (props) {
		elm.style.height = "calc(100vh - 64px)";
	}
	ReactDOM.render(
		<Provider store={store}>
			<ConfigProvider locale={zhCN}>
				<App />
			</ConfigProvider>
		</Provider>,
		elm
	);
}
if (!window.__POWERED_BY_QIANKUN__) {
	render();
}

export async function bootstrap() {
	console.log("inspection management app bootstrap>>>");
}
export async function mount(props) {
	render(props);
}
export async function unmount(props) {
	const { container } = props;
	ReactDOM.unmountComponentAtNode(
		container
			? container.querySelector("#inspectionAppRoot")
			: document.querySelector("#inspectionAppRoot")
	);
}
