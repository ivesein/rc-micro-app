import React, {useEffect, useState} from 'react';
import {getFirstActiveKey} from "../../../utils/toolfunc";
import {getTendUserNameRequest} from "../data-source/async";
import {getDictTypeRequest} from "../../InspectPlan/data-source/async";

const useMainService = () => {
    const [activeKey, setActiveKey] = useState(getFirstActiveKey());
    const [breadChainsId,setBreadChainsId] = useState(1);
    const [realName,setRealName] = useState('');
    const [checkTypeList,setCheckTypeList] = useState([]);

    useEffect(() => {
        getRealUserName();
        getDictType();
    },[]);

    const getDictType = async () => {
        const data = await getDictTypeRequest();
        data && setCheckTypeList(data?.checkType);
    }

    const getRealUserName = async () => {
        const userInfo = await getTendUserNameRequest();
        userInfo && setRealName(userInfo?.name);
    }

    return {
        activeKey,
        setActiveKey ,
        breadChainsId,
        setBreadChainsId,
        realName,
        checkTypeList
    }
};

export default useMainService;
