import React from 'react';
import ProjectType from "./ProjectType";
import OtherType from "./OtherType";
import {ProjectTreeContext} from "./Context";
import useProjectTreeService from "./hooks";
import styles from './index.module.scss';

const CategoryList = (props) => {
    const service = useProjectTreeService(props);
    return (
        <ProjectTreeContext.Provider value={service}>
            <div className={styles.category}>
                <ProjectType/>
                <OtherType/>
            </div>
        </ProjectTreeContext.Provider>
    );
};

export default CategoryList;