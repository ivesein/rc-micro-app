import React, {useContext} from 'react';
import styles from './index.module.scss';
import {PlusOutlined} from '@ant-design/icons';
import {InspectFormContext} from "../../../../context";

const AddManagement = () => {
    const formService = useContext(InspectFormContext);
    return (
        <>
            {
                formService.isAllowAddManagePart &&
                <div className={styles.addbutton}>
                    <PlusOutlined/>
                    <span className={styles.part} onClick={() => formService.addManageParty()}>添加管理方</span>
                </div>
            }
        </>
    );
};

export default AddManagement;