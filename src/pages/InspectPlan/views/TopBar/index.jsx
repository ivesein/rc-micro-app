import React, {useContext} from 'react';
import {Button} from "antd";
import {JJSKSearch} from 'jjsk-common-web';
import {useHistory} from 'react-router-dom';
import styles from './index.module.scss';
import {MainContext} from "../../../MainApplication/context";
import {InspectPlanContext} from "../../context";
import checkBtnPerm from "../../../../utils/checkBtnPerm";
import {AUTH_TYPE} from "../../common/config";

const TopBar = () => {
    const mainService = useContext(MainContext);
    const planService = useContext(InspectPlanContext);
    const history = useHistory();
    const onSearch = (value) => {
        planService.setSearchTableText(value);
    }

    // 创建检查计划
    const createInspectPlan = () => {
        mainService.setBreadChainsId(5);
        history.push('/inspection_management/main_page/create_plan');
    }

    return (
        <div className={styles.topbar}>
            <div>
                检查计划列表
            </div>
            <div>
                {
                    checkBtnPerm(AUTH_TYPE.SEARCH_PERMIT) &&
                    <JJSKSearch
                        style={{width: 280, height: 40}}
                        onSearch={onSearch} placeholder={'请输入检查主题'}
                    />
                }
                {
                    checkBtnPerm(AUTH_TYPE.CREATE_PERMIT) &&
                    <Button
                        type="primary"
                        size="large"
                        style={{fontSize: 14, marginLeft: 8}}
                        onClick={createInspectPlan}
                    >
                        新建
                    </Button>
                }
            </div>
        </div>
    );
};

export default TopBar;