import React from 'react';
import OperateButtonGroup from "../OperateButtonGroup";

const RectifyPerson = ({record}) => {
    const permitArray = [
        {
            key:'rectifyAction',
            tagName:'整改',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { rectifyAction(record)}
        },
        {
            key:'detail',
            tagName:'详情',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { detailAction(record)}
        }
    ]

    const rectifyAction = record => {}
    const detailAction = record => {}

    return <OperateButtonGroup buttonArray={permitArray} record={record}/>;
};

export default RectifyPerson;