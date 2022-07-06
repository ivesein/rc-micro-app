import axios from "axios";
import { logout } from "./toolfunc";
import { message } from "antd";
export const baseUrl = process.env.XAPI_BASE;
const xApi = axios.create({
	baseURL: baseUrl,
});

// 请求拦截器
xApi.interceptors.request.use(
	(config) => {
		// 每次发送请求之前本地存储中是否存在token，也可以通过Redux这里只演示通过本地拿到token
		// 如果存在userInfo 说明登录成功 取token设置请求头信息 请求接口
		// 没有userInfo说明未登录
		let useInfo = localStorage.getItem("userInfo");
		const appId = localStorage.getItem("AppId");
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
					"X-App-Id": appId || "",
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
xApi.interceptors.response.use((response) => {
	// 根据返回不同的状态码做不同的事情
	// 这里一定要和后台开发人员协商好统一的错误状态码
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
				break;
			// throw new Error(msg);
			case 401:
				// token
				message.destroy();
				message.error(msg, 1).then(() => {
					logout();
				});
				throw new Error(msg);
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
});
// 最后把封装好的axios导出
export default xApi;
