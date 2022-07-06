import React, {forwardRef, useContext} from 'react';
import {Col, Row} from "antd";
import AddManagement from "./AddManageMent";
import PartForm from "./PartForm";
import {commonTitleWrapperAppendWithHooksRef} from "../../../../../components/HOC/PannelWithTitle";
import {InspectFormContext} from "../../../context";
import TYPES from '../../../../../constant';

const InterestedParty = () => {
    const formService = useContext(InspectFormContext);

    const checkParts = formService.partyInfoMap?.[formService.checkType]?.filter(item => item.checkRelated === TYPES.CHECK_PART) ?? [];
    const rectifyParts = formService.partyInfoMap?.[formService.checkType]?.filter(item => item.checkRelated === TYPES.RECTIFY_PART) ?? [];
    const manageParts = formService.partyInfoMap?.[formService.checkType]?.filter(item => item.checkRelated === TYPES.MANAGE_PART) ?? [];

    return (
        <Row wrap style={{backgroundColor: '#FFF', height: '100%'}}>
            <Col span={8}>
                {
                    checkParts.map(item => <PartForm
                        showAdd={checkParts.length < 3 && formService.checkType === TYPES.OUTER_CHECK}
                        tag={TYPES.CHECK_PART}
                        info={item}
                        ref={self => formService.refMap.current[item.refs] = self}
                    />)
                }
            </Col>
            <Col span={8}>
                {
                    rectifyParts.map(item => <PartForm
                        showAdd={rectifyParts.length < 3 && formService.checkType === TYPES.OUTER_CHECK}
                        tag={TYPES.RECTIFY_PART}
                        info={item}
                        ref={self => formService.refMap.current[item.refs] = self}
                    />)
                }
            </Col>
            <Col span={8}>
                {
                    manageParts.map(item => <PartForm
                        showAdd={manageParts.length < 3}
                        tag={TYPES.MANAGE_PART}
                        info={item}
                        ref={self => formService.refMap.current[item.refs] = self}
                    />)
                }
            </Col>
        </Row>
    );
};

export default forwardRef(commonTitleWrapperAppendWithHooksRef(forwardRef(InterestedParty))(AddManagement)('相关方'));
