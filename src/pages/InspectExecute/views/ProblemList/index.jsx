import React from 'react';
import CategoryList from '../CategoryList';
import ProblemTable from './Table';
import TopSearch from '../CheckList/TopSearch';
import {ProblemListContext} from "../../context";
import useProblemListService from "../../service/problemList/problemListService";
import styles from './index.module.scss';

const ProblemList = () => {
    const problemService = useProblemListService();

    return (
        <ProblemListContext.Provider value={problemService}>
            <div className={styles.problemList}>
                <div className={styles.problistitem}>
                    <CategoryList />
                    <div className={styles.problemRight}>
                        <TopSearch />
                        <ProblemTable />
                    </div>
                </div>
            </div>
        </ProblemListContext.Provider>
    );
};

export default ProblemList;