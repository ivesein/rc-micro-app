import React, { useEffect } from "react";
import xApi from "../../utils/xApi";
import {SERVICE_VISIT_COUNT} from "../../api/urlConfig";
import { getAppId, getTenantId } from "../../utils/toolfunc";

const useMicroServiceAop = () => {
    useEffect(() => {
        microSerciceAop();
    }, []);

// 统计微服务
    const microSerciceAop = () => {
        const tenantId = getTenantId();
        const appId = getAppId();
        const params = {
            serviceNumber: "road_cloud_inspection_management",
            serviceName: "检查管理",
            tenantId,
            appId,
        };
        xApi.post(SERVICE_VISIT_COUNT, params);
    };
};

export default useMicroServiceAop;
