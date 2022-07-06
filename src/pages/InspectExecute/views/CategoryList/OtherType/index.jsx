import React, {useContext} from 'react';
import {ProjectTreeContext} from "../Context";
import styles from './index.module.scss';

const OtherType = () => {
    const service = useContext(ProjectTreeContext);
    return (
        <div className={styles.othertype}>
            <span
                className={styles.button}
                onClick={service.getOtherList}
                style={{
                    backgroundColor:service?.selectOtherType?'#f1f5fe':'#FFF',
                    color:service?.selectOtherType?'#245ff2':'#666'
                }}
            >其他</span>
        </div>
    );
};

export default OtherType;



// 项目内部组织
