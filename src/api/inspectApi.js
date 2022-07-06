import service from "@/clean-data/service"; //调用公路云客户端接口
import xApi from "@/clean-data/xApi"; //调用中台接口
import { INIT_DEMO_DATA } from "./urlConfig";

// 例子
export const getDemoData = (params) => {
	return service.get(INIT_DEMO_DATA);
};

