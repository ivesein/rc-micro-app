import React from 'react';
import {Space} from "antd";

const OperateButtonGroup = ({buttonArray,record}) => {
    return (
        <Space align="center">
            {
                buttonArray.map(item => {
                    return item.permit && <span
                        style={{color: item.color,cursor:'pointer'}}
                        onClick={() => item.buttonAction(item.key, record)}
                    >{item.tagName}</span>
                })
            }
        </Space>
    )
};

export default OperateButtonGroup;