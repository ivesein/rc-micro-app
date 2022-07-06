import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";
import {Button} from 'antd';
import PopModal from "../../../../../common/PopConfirm";
import {InspectFormContext} from "../../../context";
import TYPES from '../../../../../constant'
import {MainContext} from "../../../../MainApplication/context";

const ButtonGroups = () => {
    const formService = useContext(InspectFormContext);
    const mainService= useContext(MainContext);
    const history = useHistory();
    const backToMainPage = () => {
        const option = {
            title: '温馨提示',
            info: `确定要取消吗，未保存/提交的数据可能丢失`,
            agreeCallBack: () => {
                mainService.setBreadChainsId(1);
                history.push(TYPES.BACK_MAIN_TAB);
            },
            rejectCallBack: () => {
            }
        }
        PopModal.confirm(option);
    }

    return <ButtonGroupsView formService={{...formService, backToMainPage}}/>;
};

export const ButtonGroupsView = ({formService}) => {
    return (
        <div className="common-button-groups">
            <div style={{textAlign: 'right', marginTop: 10, paddingTop: 16, borderTop: '1px solid #e6e6e6'}}>
                <Button size="large" style={{width: 76, marginRight: 8, fontSize: 14}}
                        onClick={formService.backToMainPage}>取消</Button>
                <Button
                    size="large"
                    style={{
                        width: 76,
                        marginRight: 8,
                        border: 'none',
                        backgroundColor: '#EEF2FE',
                        color: '#245FF2',
                        fontSize: 14
                    }}
                    onClick={formService.save}
                    loading={formService.loading}
                >保存</Button>
                <Button
                    size="large"
                    type="primary"
                    style={{fontSize: 14}}
                    onClick={formService.submit}
                    loading={formService.loading}
                >发布</Button>
            </div>
        </div>
    );
}

export default ButtonGroups;