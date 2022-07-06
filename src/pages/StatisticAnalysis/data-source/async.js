import xApi from "@/utils/xApi";
// import service from "@/utils/service";
import API from "@/api/urlConfig";
import {
	requestWrapper,
	// requestWrapperWithoutData,
} from "@/common/requestWrapper";

export const getInspectTypeDistributionRequest = async (params) => {
	return await requestWrapper(
		() => xApi.get(API.INSPECT_TYPE_DISTRIBUTION, { params }),
		"获取检查类型分布数据失败"
	);
};

export const getQualityStatisticsRequest = async () => {
	return await requestWrapper(
		() => xApi.get(API.QUALITY_INSPECTION_STATISTICS),
		"获取质量检查统计数据失败"
	);
};

export const getProjectListRequest = async () => {
	return await requestWrapper(
		() => xApi.get(`${API.GET_PROJECT_LIST}`),
		"获取项目列表失败"
	);
};

export const getProjectProblemRequest = async (params) => {
	return await requestWrapper(
		() => xApi.get(API.PROJECT_PROBLEM_DISTRIBUTION, { params }),
		"获取项目问题分布数据失败"
	);
};
// 获取项目问题排行数据
export const getProjectProblemRankRequest = async (params) => {
	return await requestWrapper(
		() => xApi.get(API.PROJECT_PROBLEM_RANK, { params }),
		"获取项目检查问题排行数据失败"
	);
};
