import React, {useContext} from 'react';
import {InspectPlanContext} from "../../../context";
import styles from './index.module.scss';

const OtherType = () => {
    const planService = useContext(InspectPlanContext);
    return (
        <div className={styles.othertype}>
            <span
                className={styles.button}
                onClick={planService.getOtherList}
                style={{
                    backgroundColor:planService?.selectOtherType?'#f1f5fe':'#FFF',
                    color:planService?.selectOtherType?'#245ff2':'#666'
                }}
            >其他</span>
        </div>
    );
};

export default OtherType;



// 项目内部组织
