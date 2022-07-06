import {requestWrapper} from "../../../common/requestWrapper";
import xApi from "../../../utils/xApi";
import API from '../../../api/urlConfig';

export const getTendUserNameRequest = async () => {
    return await requestWrapper(() => xApi.get(API.QUERY_USER_INFO), '获取用户信息失败');
}
