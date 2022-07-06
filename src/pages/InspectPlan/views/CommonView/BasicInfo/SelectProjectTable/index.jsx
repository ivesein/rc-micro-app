import React, {useEffect, useMemo, useState} from 'react';
import {Button, message, Table} from 'antd';
import {getAllProjectListRequest} from "../../../../data-source/async";
import styles from './index.module.scss';

const SelectProjectTable = props => {
    const [projectList, setProjectList] = useState([]);
    const [selectedRowKeys, setSelectRowKeys] = useState([]);
    const columns = [
        {
            title: '项目名称',
            dataIndex: 'name',
            key: 'id',
            ellipsis: true,
        },
        {
            title: '投资类型',
            dataIndex: 'investmentTypeName',
            key: 'investmentTypeName',
            ellipsis: true,
        },
        {
            title: '建设规模',
            dataIndex: 'buildingScaleName',
            key: 'buildingScaleName',
            ellipsis: true,
        },
        {
            title: '建设性质',
            dataIndex: 'buildingNatureName',
            key: 'buildingNatureName',
            ellipsis: true,
        },
        {
            title: '路网等级',
            dataIndex: 'roadNetworkGradeName',
            key: 'roadNetworkGradeName',
            ellipsis: true,
        }
    ];

    useEffect(() => {
        getAllProjectList();
    }, []);

    const getAllProjectList = async () => {
        const data = await getAllProjectListRequest();
        data && setProjectList(data);
    };


    const onSelectChange = (selectKeysArray, record) => {
        setSelectRowKeys(selectKeysArray);
        props?.setProjectInfo?.(record)
    };

    const clearSelectProject = () => {
        setSelectRowKeys([]);
        props?.setProjectInfo?.([{}]);
    };

    return (
        <div className={styles.projectTable}>
            <div style={{textAlign: 'right', paddingTop: 10, paddingBottom: 10}}>
                <Button onClick={clearSelectProject}>清除已选项目</Button>
            </div>
            <Table
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys,
                    onChange: onSelectChange,
                }}
                rowKey={'id'}
                columns={columns}
                dataSource={projectList}
                pagination={{pageSize: 5}}
            />
        </div>
    );
};

export default SelectProjectTable;
