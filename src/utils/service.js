// 在index.js中引入axios
import axios from "axios";
import { logout } from "./toolfunc";
import { message } from "antd";
const isDEV = process.env.NODE_ENV === "development";

// 保存环境变量
// 区分开发环境还是生产环境baseUrl
export const baseUrl = process.env.API_BASE;

// 设置axios基础路径
const service = axios.create({
	baseURL: baseUrl,
});

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		let useInfo = localStorage.getItem("userInfo");
		const appId =  localStorage.getItem('AppId');
		if (useInfo !== "" && useInfo !== undefined && useInfo !== null) {
			const user = JSON.parse(useInfo);
			const token = user && user.userToken ? user.userToken : "";

			if (token) {
				config.headers = {
					token,
					"X-Button-Type": "",
					"X-System-Type": "cus_system",
					"X-Tenant-Id": user.tenantId, //租户
					"X-Tenant-Type": user.tenantType,
					"X-User-Id": user.id, //登录用户
					"X-App-Id": appId || ""
				};
			}
		}
		return config;
	},
	(error) => {
		return error;
	}
);

// 响应拦截器
service.interceptors.response.use(
	(response) => {
		if ((response.data && response.data.code) || response.code) {
			let code = response.data.code || response.code;
			let msg = response.data.msg || response.data.message;
			switch (code) {
				case 200:
					return response.data;
				case 0:
					return response.data;
				case 400:
					// 失败
					message.error(msg);
					throw new Error(msg);
				case 401:
					// token
					message.destroy();
					message.error(msg, 1).then(() => {
						!isDEV && logout();
					});
					break;
				// throw new Error(msg);
				case 403:
					// 禁止访问
					message.error(msg);
					throw new Error(msg);
				default:
					message.error(msg);
					throw new Error(msg);
			}
		} else {
			return response;
		}
	},
	(err) => {
		message.error("网络错误，请稍后再试...");
	}
);
// 最后把封装好的axios导出
export default service;
