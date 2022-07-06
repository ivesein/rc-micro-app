import React from 'react';
import styles from './index.module.scss';
import OperateButtonGroup from "../OperateButtonGroup";

const RectifyDockingMan = ({record}) => {
    const permitArray = [
        {
            key:'addRectifyPerson',
            tagName:'添加整改人',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { addRectifyPerson(record)}
        },
        {
            key:'commandFeedback',
            tagName:'意见反馈',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { commandFeedback(record)}
        },
        {
            key:'submitRectify',
            tagName:'提交整改',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { submitRectify(record)}
        },
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

    const addRectifyPerson = record => {}
    const commandFeedback = record => {}
    const submitRectify = record => {}
    const rectifyAction = record => {}
    const detailAction = record => {}

    return <OperateButtonGroup buttonArray={permitArray} record={record}/>;
};

export default RectifyDockingMan;