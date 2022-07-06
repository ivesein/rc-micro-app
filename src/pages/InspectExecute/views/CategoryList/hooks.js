import React, {useEffect, useMemo, useState} from 'react';
import {getProjectListByYearRequest} from "../../../InspectPlan/data-source/async";
import _ from 'lodash';

const useProjectTreeService = (props) => {
    const [selectYear, setSelectYear] = useState('');
    const [projectListMap, setProjectListMap] = useState([]);
    const [currentList, setCurrentList] = useState([]);
    const [selectProjectId, setSelectProjectId] = useState('init');
    const [selectOtherType, setSelectOtherType] = useState(false);
    const [searchText, setSearchText] = useState('');

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

    const clearOtherType = () => {
        setSelectOtherType(false);
    }

    // 搜索树
    const searchProjectTree = (text) => {
        setSearchText(text);
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
    }, [calculateListInfo, searchText]);

    const setProjectListSelectId = id => {
        setSelectOtherType(false);
        setSelectProjectId(id);
    }

    const getOtherList = async () => {
        setSelectProjectId('');
        setSelectOtherType(true);
    }

    useEffect(() => {
        selectProjectId !== 'init' && props?.setProjectId?.(selectProjectId)
    }, [selectProjectId])

    return {
        selectYear, setSelectYear,
        filterList: calculateListInfoWithSearch,
        selectProjectId, setSelectProjectId,
        selectOtherType,
        searchProjectTree,
        setProjectListSelectId,
        getOtherList
    }
};

export default useProjectTreeService;