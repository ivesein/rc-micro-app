import {requestWrapper} from "../../../common/requestWrapper";
import xApi from "../../../utils/xApi";
import API from '../../../api/urlConfig';

export const getCheckListRequest = async (params) => {
    return await requestWrapper(() => xApi.get(API.GET_EXECUTE_CHECK_LIST, {
        params
    }), '获取检查列表失败');
}