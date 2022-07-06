import React from 'react';
import OperateButtonGroup from "../OperateButtonGroup";

const CheckPerson = ({record}) => {
    const permitArray = [
        {
            key:'checkAction',
            tagName:'检查',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { checkAction(record)}
        },
        {
            key:'revokeAction',
            tagName:'撤销',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { revokeAction(record)}
        },
        {
            key:'addCommand',
            tagName:'添加意见',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { addCommand(record)}
        },
        {
            key:'enshureAction',
            tagName:'确认',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { enshureAction(record)}
        },
        {
            key:'detail',
            tagName:'详情',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { detailAction(record)}
        }
    ]

    const revokeAction = record => {}
    const addCommand = record => {}
    const enshureAction = record => {}
    const checkAction = record => {}
    const detailAction = record => {}

    return <OperateButtonGroup buttonArray={permitArray} record={record}/>;

};

export default CheckPerson;