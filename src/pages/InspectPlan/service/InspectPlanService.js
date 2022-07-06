import React, {useEffect, useMemo, useState} from 'react';
import {getInspectTableDataRequest, getOtherListRequest, getProjectListByYearRequest} from "../data-source/async";
import {usePagination} from "../../../components/CustomHooks/pagination";
import _ from 'lodash';

const useInspectPlanService = () => {
    const [selectYear, setSelectYear] = useState('');
    const [tableData, setTableData] = useState([]);
    const [projectListMap, setProjectListMap] = useState([]);
    const [currentList, setCurrentList] = useState([]);
    const {paginationOptions, total, setTotal, currentPage, setCurrentPage, pageSize, setPageSize} = usePagination();
    const [selectProjectId, setSelectProjectId] = useState('');
    const [selectOtherType,setSelectOtherType] = useState(false);
    const [searchText,setSearchText] = useState('');
    const [searchTableText,setSearchTableTextValue] = useState('');
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        getProjectList();
    }, [])

    const getProjectList = async () => {
        const data = await getProjectListByYearRequest();
        data && setProjectListMap(data);
    }

    useEffect(() => {
        clearSearchData();
        setDefaultList();
        clearOtherType();
    }, [projectListMap, selectYear]);

    const clearSearchData = () => {
        setSearchText('');
    }

    const setDefaultList = () => {
        if (selectYear) {
            const list = cleanDataFunc(projectListMap[selectYear]);
            setCurrentList(list);
        } else {
            const allList = cleanDataFunc(_.uniqBy(Object.values(projectListMap).flatMap(item => item),'id'));
            setCurrentList(allList);
        }
    }

    const cleanDataFunc = data => {
        if (!data) return [];
        return data.map((item, index) => {
            if (index === 0) {
                setSelectProjectId(item.id);
                return {...item, select: true};
            }
            return {...item, select: false};
        })
    }

    useEffect(() => {
        selectProjectId && getInspectTableData() && clearOtherType();
    }, [selectProjectId,searchTableText,pageSize,currentPage]);

    const getInspectTableData = async () => {
        const params = getParams();
        setLoading(true);
        const data = await getInspectTableDataRequest(params);
        setLoading(false);
        if (data) {
            const {total, size, records} = data
            setTableData(records);
            setTotal(Number(total))
        }
    }

    const getParams = () => ({
        projectId:selectProjectId,
        ...(searchTableText && {title:searchTableText}),
        pageSize,
        current:currentPage
    })

    const clearOtherType = () => {
        setSelectOtherType(false);
    }

    const calculateListInfo = useMemo(() => {
        return selectProjectId ? currentList.map(item => {
            if (item.id === selectProjectId) {
                return {...item, select: true};
            }
            return {...item, select: false};
        }) : currentList;
    }, [currentList, selectProjectId]);

    const calculateListInfoWithSearch = useMemo(() => {
        return calculateListInfo.filter(item => item.name.includes(searchText));
    },[calculateListInfo,searchText]);

    useEffect(() => {
        currentList.length === 0 && setTableData([]);
    }, [currentList]);

    const getOtherList = async () => {
        clearSelectProjectStatus();
        const data = await getOtherListRequest();
        setTableData(data);
    }

    const clearSelectProjectStatus = () => {
        setSelectProjectId('');
        setSelectOtherType(true);
        setSearchText('');
        setCurrentList(prevState => prevState.map(item => ({...item,select:false})));
    }

    // 搜索树
    const searchProjectTree = (text) => {
        setSearchText(text);
    }

    const updateTableList = () => {
        getInspectTableData();
    }

    const setSearchTableText = (text) => {
        setSearchTableTextValue(text);
    }

    return {
        selectYear, setSelectYear,
        tableData,
        paginationOptions,
        filterList: calculateListInfoWithSearch,
        selectProjectId, setSelectProjectId,
        getOtherList,
        selectOtherType,
        searchProjectTree,
        updateTableList,
        setSearchTableText,
        loading
    }
};

export default useInspectPlanService;