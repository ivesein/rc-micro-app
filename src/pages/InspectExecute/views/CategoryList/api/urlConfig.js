import { baseUrl } from "../utils/xApi";

const isDEV = process.env.NODE_ENV === "development";
const MIDDLE_PROXY = isDEV ? "/middleApi" : "";
const INSPECT_PROXY = isDEV ? "/inspectionApi" : "";
export const SERVICE_VISIT_COUNT = "/logmanage/service_visit";
const FILE_UPLOAD_PROXY = isDEV ? "/middleApi" : baseUrl;

// 检查计划api
const planApi = {
    GET_ALL_DICT_TYPE: `${MIDDLE_PROXY}/checkmanagement/jjsk-dict-check-type/dictTypeList`,
    GET_PLAN_CODE: `${MIDDLE_PROXY}/checkmanagement/jjsk-dict-check-type/planCode`,
    GET_PROJECT_LIST: `${INSPECT_PROXY}/project_creation/jjsk-project-info/searchProjectListNew`,
    GET_COMPANY_USER_BY_PROJECT: `${MIDDLE_PROXY}/userauth/jjsk/organization/groupProjectOrgList`,
    CREATE_PLAN:`${MIDDLE_PROXY}/checkmanagement/jjsk-check-plan/saveCheckPlan`,
    GET_CHECK_LIST:`${MIDDLE_PROXY}/checkmanagement/jjsk-check-plan/getCheckPlanListByProjectId`,
    GET_CHECK_DETAIL:`${MIDDLE_PROXY}/checkmanagement/jjsk-check-plan/checkPlanDetailById/`,
    GET_PROJECT_LIST_BY_YEAR:`${INSPECT_PROXY}/project_creation/jjsk-project-info/getProjectGroupYear`,
    GET_OTHER_CHECK_PLAN_LIST:`${MIDDLE_PROXY}/checkmanagement/jjsk-check-plan/getOtherCheckPlanList`,
    DELETE_PLAN:`${MIDDLE_PROXY}/checkmanagement/jjsk-check-plan/deleteCheckPlanById/`
}

// 检查执行api
const executeApi = {};

// 检查设置setting
const settingApi = {
	GET_INSPECT_TYPE: `${MIDDLE_PROXY}/checkmanagement/jjsk-dict-check-type/checkTypeList`,
	CREATE_OR_UPDATE_INSPECT_TYPE: `${MIDDLE_PROXY}/checkmanagement/jjsk-dict-check-type/addOrUpdateCheckType`,
	GET_NEW_INSPECT_TYPE_CODE: `${MIDDLE_PROXY}/checkmanagement/jjsk-dict-check-type/planCodeByType`,
	DELETE_INSPECT_TYPE: `${MIDDLE_PROXY}/checkmanagement/jjsk-dict-check-type/deleteCheckType`,
};

// 中台api
const middleApi = {
    QUERY_USER_INFO: `${MIDDLE_PROXY}/userauth/jjsk_tenantuser_info/getNowUserInfo`,
    QUERY_BELONG_ORG: `${MIDDLE_PROXY}/userauth/jjsk_tenant_user/queryTenantUser`,
    UPLOAD_FILE: `${FILE_UPLOAD_PROXY}/file/no_token/file/upload`,
    BATCH_QUERY: `${MIDDLE_PROXY}/userauth/jjsk/organization/getCheckInfo`
}

export default {
	...planApi,
	...executeApi,
	...middleApi,
	...settingApi,
};
