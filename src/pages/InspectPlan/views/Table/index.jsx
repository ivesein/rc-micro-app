import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Drawer, message, Table} from 'antd';
import {MainContext} from "../../../MainApplication/context";
import {InspectPlanContext} from "../../context";
import TopBar from "../TopBar";
import InspectDetail from "../Detail";
import OperateColumn from "./OperateColumn";
import {deleteActionRequest} from "../../data-source/async";
import PopModal from "../../../../common/PopConfirm";
import styles from './index.module.scss';

const InspectPlanTable = () => {
    const history = useHistory();
    const mainService = useContext(MainContext);
    const planService = useContext(InspectPlanContext);
    const [visible, setVisible] = useState(false);
    const [detailId, setDetailId] = useState('');
    const columns = [
        {
            title: '序号',
            render: (text, record, index) => {
                return index + 1;
            },
            width: 80,
        },
        {
            title: '单据编号',
            dataIndex: 'planCode',
            ellipsis: true,
            render: (text, record) => {
                return <span
                    style={{color: '#245FF2', cursor: 'pointer'}}
                    onClick={() => actionMap['detail']?.(record)}
                >{text}</span>
            }
        },
        {
            title: '检查主题',
            ellipsis: true,
            dataIndex: 'checkTitle'
        },
        {
            title: '检查类型',
            dataIndex: 'checkType',
            ellipsis: true,
            render: (text) => {
                return mainService.checkTypeList?.find(item => item.longCode === text)?.title
            }
        },
        {
            title: '发布人',
            dataIndex: 'releasePersonName',
            ellipsis: true,
        },
        {
            title: '发布组织',
            dataIndex: 'orgName',
            ellipsis: true,
        },
        {
            title: '发布时间',
            dataIndex: 'gmtCreated',
            ellipsis: true,
            width: 170,
            render: (text, record) => {
                if (record?.planStatus === '0') return '-';
                return record?.gmtModified ?? record?.gmtCreated;
            }
        },
        {
            title: '单据状态',
            dataIndex: 'planStatus',
            ellipsis: true,
            render: (text, record) => {
                const map = {
                    0: '暂存',
                    1: '发布'
                }
                return map[text];
            }
        },
        {
            title: '操作',
            dataIndex: '',
            width: 185,
            render: (text, record) => {
                const map = {
                    0: () => <OperateColumn actionMap={(key, record) => actionMap[key](record)} record={record}/>,
                    1: () => <span style={{
                        color: '#245FF2',
                        cursor: 'pointer',
                        paddingLeft: 5
                    }} onClick={() => actionMap['detail']?.(record)}>详情</span>
                }
                return map[record?.planStatus]?.();
            }
        }
    ]

    const actionMap = {
        edit: record => editAction(record),
        detail: record => detailAction(record),
        delete: record => deleteAction(record),
    }

    const editAction = record => {
        mainService.setBreadChainsId(6); // 设置面包屑
        history.push({
            pathname: '/inspection_management/main_page/edit_plan',
            state: {editId: record?.id}
        })
    }

    const detailAction = record => {
        setVisible(true);
        setDetailId(record?.id);
    }

    const deleteAction = async record => {
        PopModal.confirm({
            title: "温馨提示",
            info: '确定要删除吗？',
            async agreeCallBack() {
                const success = await deleteActionRequest(record?.id);
                success && message.success('删除成功') && planService.updateTableList();
            },
            rejectCallBack() {
            }
        })
    }

    const onDrawerClose = () => {
        setVisible(false);
        setDetailId('');
    }

    return (
        <div className={styles.righttable}>
            <TopBar/>
            <div className={styles.realtable}>
                <Table
                    className={"inspect-plan-table"}
                    loading={planService.loading}
                    pagination={planService.paginationOptions}
                    columns={columns}
                    dataSource={planService.tableData}
                    scroll={{x: 1300}}
                />
            </div>
            <Drawer
                className="inspect-drawer-com"
                title={'检查详情'}
                placement="right"
                closable={true}
                onClose={onDrawerClose}
                destroyOnClose={true}
                visible={visible}
                width={1600}
            >
                {detailId && <InspectDetail detailId={detailId}/>}
            </Drawer>
        </div>
    );
};

export default InspectPlanTable;

