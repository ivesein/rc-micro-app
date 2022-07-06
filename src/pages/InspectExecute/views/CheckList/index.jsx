import React from 'react';
import CategoryList from '../CategoryList';
import TopSearch from './TopSearch';
import CheckTable from './Table';
import useCheckListService from "../../service/checkList/checkListService";
import {CheckListContext} from "../../context";
import styles from './index.module.scss';

const CheckList = () => {
    const checkListService = useCheckListService();

    return (
        <CheckListContext.Provider value={checkListService}>
            <div className={styles.checklist}>
                <div className={styles.checklistitem}>
                    <CategoryList setProjectId={checkListService.setProjectId} />
                    <div className={styles.checkRight}>
                        <TopSearch />
                        <CheckTable />
                    </div>
                </div>
            </div>
        </CheckListContext.Provider>
    );
};

export default CheckList;