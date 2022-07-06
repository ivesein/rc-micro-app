import {message} from "antd";

export const requestWrapper = async (async, errMsg) => {
    try {
        const {code, result, data, msg, message: errSysmes} = await async();
        if (code === 200) {
            return result || data;
        } else {
            message.error(msg || errSysmes);
        }
    } catch (e) {
        message.error(errMsg)
    }
}

export const requestWrapperWithoutData = async (async, errMsg) => {
    try {
        const {code, data, message: msg, result, success} = await async();
        if (code === 200) {
            return {code, data, result, msg, success};
        } else {
            message.error(msg);
        }
    } catch (e) {
        message.error(errMsg)
    }
}

export const requestWrapperForPromiseAll = async (async, errMsg) => {
    try {
        return await async();
    } catch (e) {
        message.error(errMsg)
        return [{}, {}]
    }
}

