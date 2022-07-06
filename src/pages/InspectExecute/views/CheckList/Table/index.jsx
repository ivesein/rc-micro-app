import {Table} from 'antd';
import styles from './index.module.scss';
import React, {useContext} from 'react';
import {CheckListContext} from "../../../context";
import CheckDockingMan from "../components/CheckDockingMan";
import CheckPerson from "../components/CheckPerson";
import ManageDockingMan from "../components/ManageDockingMan";
import RectifyDockingMan from "../components/RectifyDockingMan";
import RectifyPerson from "../components/RectifyPerson";
import {MainContext} from "../../../../MainApplication/context";
import {checkCNMap} from "../../../../../constant";
import InnerCheckPerson from "../components/InnerCheckPerson";
import InnerRectifyPerson from "../components/InnerRectifyPerson";

const CheckTable = () => {
    const checkListService = useContext(CheckListContext);
    const mainService = useContext(MainContext);

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                const {pageSize, currentPage} = checkListService.pagination;
                return (currentPage - 1) * pageSize + index + 1;
            }
        },
        {
            title: '检查主题',
            dataIndex: 'checkTitle',
            key: 'checkTitle',
        },
        {
            title: '检查类型',
            dataIndex: 'checkType',
            key: 'checkType',
            render: (text) => {
                return mainService?.checkTypeList?.find(item => item.longCode === text)?.title;
            }
        },
        {
            title: '检查属性',
            dataIndex: 'checkProperties',
            key: 'checkProperties',
            render: (text) => {
                return checkCNMap[text];
            }
        },
        {
            title: '负责人',
            dataIndex: 'managementLeaderName',
            key: 'managementLeaderName',
        },
        {
            title: '截止日期',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: '单据状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '当前版本',
            dataIndex: 'version',
            key: 'version',
        },
        {
            title: '处理环节',
            dataIndex: 'handle',
            key: 'handle',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 400,
            render: (text, record) => {
                return getRenderComponent(record);
            }
        }
    ]

    const getRenderComponent = record => {
        const componentMap = {
            1: () => <CheckDockingMan record={record}/>,
            2: () => <CheckPerson record={record}/>,
            3: () => <ManageDockingMan record={record}/>,
            4: () => <RectifyDockingMan record={record}/>,
            5: () => <RectifyPerson record={record}/>,
            6: () => <InnerCheckPerson record={record}/>,
            7: () => <InnerRectifyPerson record={record}/>
        }
        return componentMap[1]();
    }

    return (
        <div className={styles.checktable}>
            <Table
                columns={columns}
                dataSource={checkListService.tableData}
                pagination={checkListService.pagination.paginationOptions}
                className={styles.table}
            />
        </div>
    );
};

export default CheckTable;