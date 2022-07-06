import React from 'react';
import OperateButtonGroup from "../OperateButtonGroup";

const ManageDockingMan = ({record}) => {
    const permitArray = [
        {
            key:'manage',
            tagName:'管理',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { manageAction(record)}
        },
        {
            key:'detail',
            tagName:'详情',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { detailAction(record)}
        }
    ]

    const manageAction = record => {}
    const detailAction = record => {}

    return <OperateButtonGroup buttonArray={permitArray} record={record}/>;
};

export default ManageDockingMan;