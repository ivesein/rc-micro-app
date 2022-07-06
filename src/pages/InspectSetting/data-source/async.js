import xApi from "@/utils/xApi";
// import service from "@/utils/service";
import API from "@/api/urlConfig";
import {
	requestWrapper,
	requestWrapperWithoutData,
} from "@/common/requestWrapper";

export const getInspectTypeRequest = async (params) => {
	return await requestWrapper(
		() => xApi.get(API.GET_INSPECT_TYPE, { params }),
		"获取检查类型失败"
	);
};

export const getNewTypeCodeRequest = async () => {
	return await requestWrapper(
		() => xApi.get(API.GET_NEW_INSPECT_TYPE_CODE),
		"获取最新类型编码失败"
	);
};

export const addOrUpdateInspectTypeRequest = async (params) => {
	return await requestWrapper(
		() => xApi.post(API.CREATE_OR_UPDATE_INSPECT_TYPE, params),
		params?.id ? "编辑检查类型失败" : "新增检查类型失败"
	);
};

export const deleteInspectTypeRequest = async (id) => {
	return await requestWrapperWithoutData(
		() => xApi.delete(`${API.DELETE_INSPECT_TYPE}/${id}`),
		"删除检查类型失败"
	);
};
