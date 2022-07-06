import React from 'react';
import {Pagination} from "antd";
import styles from './index.module.scss';

const CustomPagination = ({paginationOptions}) => {
    return (
        <div className={styles.pagination}>
            <Pagination{...paginationOptions}/>
        </div>
    );
};

export default CustomPagination;