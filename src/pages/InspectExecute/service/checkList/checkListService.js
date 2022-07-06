import React, {useEffect, useState} from 'react'
import {getCheckListRequest} from "../../data-source/async";
import {usePagination} from "../../../../components/CustomHooks/pagination";

const useCheckListService = () => {
    const [tableData, setTableData] = useState([]);
    const [projectId, setProjectId] = useState('init');
    const pagination = usePagination();

    useEffect(() => {
        projectId !== 'init' && getCheckList();
    }, [projectId]);

    const getCheckList = async () => {
        const params = {
            projectId,
            size: pagination.pageSize,
            current: pagination.currentPage
        }
        const data = await getCheckListRequest(params);
        if (data) {
            setTableData(data?.records ?? []);
            pagination.setTotal(Number(data?.total))
        }
    }

    return {
        tableData, setTableData,
        projectId, setProjectId,
        pagination
    }
}

export default useCheckListService
