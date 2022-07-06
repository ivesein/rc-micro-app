import React from 'react';
import {InspectPlanContext} from "./context";
import CategoryList from "./views/CategoryList";
import InspectPlanTable from "./views/Table";
import useInspectPlanService from "./service/InspectPlanService";
import styles from './index.module.scss';

const InspectPlan = () => {
    const service = useInspectPlanService();

    return (
        <InspectPlanContext.Provider value={service}>
            <div className={styles.plan}>
                <CategoryList/>
                <InspectPlanTable/>
            </div>
        </InspectPlanContext.Provider>
    );
};

export default InspectPlan;