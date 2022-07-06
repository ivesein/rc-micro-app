import React from 'react';
import {EditOutlined, MinusCircleOutlined} from '@ant-design/icons';
import checkBtnPerm from "../../../../../utils/checkBtnPerm";
import {AUTH_TYPE as AUTH_TYPES} from "../../../common/config";
import './index.scss';

const OperateColumn = props => {
    const buttonList = [
        {
            key: 'edit',
            name: '编辑',
            icon: <EditOutlined/>,
            className: 'edit-contract',
            hasPermit: checkBtnPerm(AUTH_TYPES.EDIT_PERMIT)
        },
        {
            key: 'delete',
            name: '删除',
            icon: <MinusCircleOutlined/>,
            className: 'remove-contract',
            hasPermit: checkBtnPerm(AUTH_TYPES.DELETE_PERMIT)
        },
        {
            key: 'detail',
            name: '详情',
            icon: <MinusCircleOutlined/>,
            className: 'detail-contract',
            hasPermit: true
        }
    ]

    return (
        <div className="operate-columns-box">
            {
                buttonList.filter(({hasPermit}) => hasPermit).map(item => {
                    return (
                        <div className={item.className} key={item.key}
                             onClick={() => props.actionMap(item.key, props.record)}>
                            {<span>{item.name}</span>}
                        </div>
                    )
                })
            }
        </div>
    );
};

export default OperateColumn;