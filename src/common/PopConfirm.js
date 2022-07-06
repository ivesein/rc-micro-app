import React from 'react';
import {Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import deletewarn from '../assets/deletewarn.svg'
import warnimg from '../assets/tanhao.svg'
import './index.scss'


const PopConfirm = ({title, info, agreeCallBack, rejectCallBack}) => {
    Modal.confirm({
        title: title,
        icon: <ExclamationCircleOutlined/>,
        content: info,
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
            agreeCallBack();
        },
        onCancel: () => {
            rejectCallBack();
        },
    });
}

const PopCusWarn = ({ info}) => {
    Modal.warning({
        title: '温馨提示',
        className:'jingyongxin_popconfirm',
        content: (
            <div>
                <div><img src={warnimg} style={{width:40}} alt=""/></div>
                {info}<span style={{color:'orange'}}>不能删除</span>
            </div>
        ),
    })
}

const PopCusConfirm = ({title, info, agreeCallBack, rejectCallBack}) => {
    Modal.confirm({
        title,
        className:'jingyongxin_popconfirm',
        content: (
            <span>
                <img src={deletewarn} style={{width:40}} alt=""/>
                <p>{info}</p>
            </span>
        ),
        footer: [],
        onOk: () => {
            agreeCallBack();
        },
        onCancel: () => {
            rejectCallBack();
        },
    });
}

const PopInfo = (info, callback) => {
    Modal.info({
        title: '温馨提示',
        content: (
            <div>
                {info}
            </div>
        ),
        onOk() {
            // callback()
        },
    });
}

const Popwarn = (info) => {
    Modal.warning({
        title: '温馨提示',
        content: (
            <div>
                {info}
            </div>
        ),
        onOk() {
            // callback()
        },
    })
}

const PopModal = {
    confirm: PopConfirm,
    info: PopInfo,
    warn:Popwarn,
    cuswarn:PopCusWarn,
    cusConfirm:PopCusConfirm
}

export default PopModal;