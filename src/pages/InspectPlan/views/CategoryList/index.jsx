import React from 'react';
import ProjectType from "./ProjectType";
import OtherType from "./OtherType";
import styles from './index.module.scss';

const CategoryList = () => {
    return (
        <div className={styles.category}>
            <ProjectType />
            <OtherType />
        </div>
    );
};

export default CategoryList;