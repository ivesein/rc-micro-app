import React, {useEffect, useMemo, useState} from 'react';
import {getDictTypeRequest, getPlanDetailRequest} from "../data-source/async";
import {getTendUserNameRequest} from "../../MainApplication/data-source/async";

const useInspectDetailService = (id) => {
    const [detail, setDetail] = useState();
    const [realName, setRealName] = useState('');
    const [checkTypeList, setCheckTypeList] = useState([]);
    const [checkPropertiesList, setCheckProperties] = useState([]);

    useEffect(() => {
        getRealUserName();
        getDictType();
        getPlanDetail();
    }, []);

    const getDictType = async () => {
        const data = await getDictTypeRequest();
        if (data) {
            setCheckTypeList(data?.checkType);
            setCheckProperties(data?.checkProperties);
        }
    }

    const getRealUserName = async () => {
        const userInfo = await getTendUserNameRequest();
        userInfo && setRealName(userInfo?.name);
    }

    const getPlanDetail = async () => {
        const data = await getPlanDetailRequest(id);
        data && setDetail(data)
    }

    const assignDetail = useMemo(() => {
        const info = {
            publish: realName,
            checkTypeName: checkTypeList?.find?.(item => item.longCode === detail?.plan?.checkType)?.title,
            checkPropertiesName: checkPropertiesList?.find?.(item => item.longCode === detail?.plan?.checkProperties)?.title
        }
        return {
            ...detail,
            plan: {
                ...detail?.plan,
                ...info
            }
        }
    }, [detail, realName, checkTypeList,checkPropertiesList]);

    return {detail: assignDetail, realName, checkTypeList, checkPropertiesList};
};

export default useInspectDetailService;