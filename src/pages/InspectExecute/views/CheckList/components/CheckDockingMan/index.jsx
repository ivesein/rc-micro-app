import React from 'react';
import styles from './index.module.scss';
import OperateButtonGroup from "../OperateButtonGroup";

const CheckDockingMan = (record) => {
    const permitArray = [
        {
            key:'addCheckPerson',
            tagName:'添加检查人',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { addCheckPerson(record)}
        },
        {
            key:'commandFeedback',
            tagName:'意见反馈',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { commandFeedback(record)}
        },
        {
            key:'submitCheck',
            tagName:'提交检查',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { submitCheck(record)}
        },
        {
            key:'checkAction',
            tagName:'检查',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { checkAction(record)}
        },
        {
            key:'addCheckPerson',
            tagName:'添加检查人',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { addCheckPerson(record)}
        },
        {
            key:'detail',
            tagName:'详情',
            permit:true,
            color:"#245FF2",
            buttonAction:(key,record) => { detailAction(record)}
        }
    ]

    const addCheckPerson = record => {}
    const commandFeedback = record => {}
    const submitCheck = record => {}
    const checkAction = record => {}
    const detailAction = record => {}

    return (
        <OperateButtonGroup buttonArray={permitArray} record={record}/>
    );
};

export default CheckDockingMan;