import React, {useContext} from 'react';
import DropDownProjectList from "./DropDown";
import ProjectList from "./ProjectList";
import styles from './index.module.scss';
import {InspectPlanContext} from "../../../context";

const ProjectType = () => {
    const planService = useContext(InspectPlanContext);
    return (
        <div className={styles.projectType}>
            <div className={styles.topclass} id={'inspect-drop-id'}>
                <span>项目</span>
                <span>
                    <span style={{paddingRight: 10}}>
                        {planService.selectYear ? `${planService.selectYear}年` : ''}
                    </span>
                    <DropDownProjectList/>
                </span>
            </div>
            <ProjectList/>
        </div>
    );
};

export default ProjectType;