import API from '../../../api/urlConfig'
import xApi from "../../../utils/xApi";
import service from "../../../utils/service";
import {requestWrapper, requestWrapperWithoutData} from "../../../common/requestWrapper";
import {convertDataToSelectFormat, dealOrgData, dealRoleData} from "./data-clean";

export const uploadImage = (data, onProgress) => {
    return xApi.post(API.UPLOAD_FILE, data, {
        headers: {contentType: false},
        onUploadProgress: (progress) => {
            // 格式化成百分数
            let pro = Math.floor((progress.loaded / progress.total) * 100);
            if (onProgress) {
                onProgress(pro);
            }
        },
    });
};

export const getDictTypeRequest = async () => {
    const data = await requestWrapper(() => xApi.get(API.GET_ALL_DICT_TYPE), '获取数据字典值失败');
    return convertDataToSelectFormat(data);
}

export const getFormCodeRequest = async () => {
    return await requestWrapper(() => xApi.get(API.GET_PLAN_CODE), '获取单据编号失败');
}

export const getAllProjectListRequest = async () => {
    return await requestWrapper(() => service.get(API.GET_PROJECT_LIST), '获取项目信息失败');
}

export const getCompanyAndPersonRequest = async projectId => {
    return await requestWrapper(() => xApi.get(`${API.GET_COMPANY_USER_BY_PROJECT}`, {
        params: {
            ...(projectId && {projectId})
        }
    }))
}

export const getBelongOrgRequest = async userId => {
    const data = await requestWrapper(() => xApi.get(`${API.QUERY_BELONG_ORG}`, {
        params: {
            id: userId
        }
    }));
    return dealOrgData(data);
}

export const getUnitRolesRequest = async params => {
    const data = await requestWrapper(() => xApi.post(`${API.BATCH_QUERY}`, params));
    return dealRoleData(data);
}

export const createPlanRequest = async params => {
    const data = await requestWrapperWithoutData(() => xApi.post(`${API.CREATE_PLAN}`, params),'创建检查计划失败');
    return data?.success;
}

export const getInspectTableDataRequest =async (params) => {
    const data = await requestWrapper(() => xApi.get(`${API.GET_CHECK_LIST}`,{
        params
    } ),'获取检查列表失败');
    return data;
}

export const getPlanDetailRequest = async id => {
    return await requestWrapper(() => xApi.get(`${API.GET_CHECK_DETAIL}${id}`),'获取计划详情失败');
}

export const getProjectListByYearRequest = async () => {
    return await requestWrapper(() => service.get(API.GET_PROJECT_LIST_BY_YEAR),'获取项目列表失败');
}

export const getOtherListRequest = async () => {
    return await requestWrapper(() => xApi.get(API.GET_OTHER_CHECK_PLAN_LIST),'获取其它类型失败');
}

export const deleteActionRequest = async id => {
    const data = await requestWrapperWithoutData(() => xApi.delete(`${API.DELETE_PLAN}${id}`),'删除失败')
    return data?.success;
}