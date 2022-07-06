import React from 'react';
import {useHistory} from 'react-router-dom';
import {CloseOutlined} from "@ant-design/icons";
import styles from './index.module.scss';

const TopTitle = (props) => {
    const history = useHistory();
    return (
        <div className={styles.title}>
            <span>{props.title}</span>
            <span className={styles.close} onClick={() => history.push(props.backUrl)}>
                <CloseOutlined style={{color:'#DDD'}}/>
            </span>
        </div>
    );
};

export default TopTitle;