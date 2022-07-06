import React from 'react';
import { Table } from 'antd';
import styles from './index.module.scss';

const ProblemTable = () => {
    const columns = [
        {
            title: '编码',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: '问题及意见',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '检查主题',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '检查类型',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '检查属性',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '创建人',
            dataIndex: 'leader',
            key: 'leader',
        },
        {
            title: '状态',
            dataIndex: 'billStatus',
            key: 'billStatus',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: () => <span>111</span>
        }
    ]

    const data = [];
    return (
        <div className={styles.probtable}>
            <Table 
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey={(record, index) => index}
                className={styles.table}
            />
        </div>
    );
};

export default ProblemTable;