import React, {useContext} from 'react';
import DropDownProjectList from "./DropDown";
import ProjectList from "./ProjectList";
import {ProjectTreeContext} from "../Context";
import styles from './index.module.scss';

const ProjectType = () => {
    const service = useContext(ProjectTreeContext);
    return (
        <div className={styles.projectType}>
            <div className={styles.topclass} id={'inspect-drop-id'}>
                <span>项目</span>
                <span>
                    <span style={{paddingRight: 10}}>
                        {service.selectYear ? `${service.selectYear}年` : ''}
                    </span>
                    <DropDownProjectList/>
                </span>
            </div>
            <ProjectList/>
        </div>
    );
};

export default ProjectType;