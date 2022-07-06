import React, {forwardRef, useContext} from 'react';
import {Col, message, Modal, Row} from "antd";
import {JJSKUserSelector, JJSKWeakSearch} from 'jjsk-common-web';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import TYPES from '../../../../../../constant';
import checkPartIcon from '../../../../../../assets/checkpart.svg';
import rectifyPartIcon from '../../../../../../assets/rectity.svg';
import managePartIcon from '../../../../../../assets/managePart.svg';
import {InspectFormContext} from "../../../../context";
import xApi from "../../../../../../utils/xApi";
import {titleMap} from "../../../../common/config";
import styles from './index.module.scss';

const PartForm = ({tag, info, showAdd}, ref) => {
    const formService = useContext(InspectFormContext);
    const restList = [
        {
            key: 'phone',
            title: titleMap[tag]?.phone?.title,
        },
        {
            key: 'tenantName',
            title: titleMap[tag]?.unit?.title,
        },
        {
            key: 'projectName',
            title: titleMap[tag]?.project?.title,
        },
        {
            key: 'projectStage',
            title: titleMap[tag]?.projectStage?.title,
        }
    ]

    const selectPerson = (info) => {
        debugger;
        if (formService.checkType === TYPES.OUTER_CHECK && !formService.projectId) {
            message.warn('请先选择所属项目');
            return;
        }
        const selectorModal = Modal.confirm({
            modalRender: () => (
                <JJSKUserSelector
                    title={"选择指定人员"}   //弹框标题
                    modal={selectorModal}    //此处创建的modal实例用于更新或关闭模态框
                    type={formService.checkType === TYPES.OUTER_CHECK ? "6" : "1"}  //内外部人员组织架构组合类型
                    xApi={xApi} //指向中台网关的axios实例，用于获取组织人员数据
                    single={formService.checkType === TYPES.OUTER_CHECK}  //是否单选 默认为多选
                    {...(info?.key && {selectedKeys:info?.key?.split(',')})}
                     //已选择的人员key 用于回填已选择人员
                    {...(formService.projectId && {projectId: formService.projectId})}
                    onOk={onOk} //确定按钮回调 用于获取最终结果数据
                />
            ),
            width: 710, //必须
            centered: true,
            maskClosable: false,
            destroyOnClose: true,
        })
    }

    const onOk = (result) => {
        const preResult = preDealResult(result);
        formService.setSelectPersonInfo(preResult, info);
    }

    const preDealResult = (result) => {
        if (!result) return {};
        if (formService.checkType === TYPES.OUTER_CHECK) {
            return result?.pop?.() ?? {}
        }
        return result?.reduce((total, current, index) => {
            const {userName = '', userId = '',key=''} = total;
            return {
                ...current,
                userName: `${userName}${index === 0 ? '' : ','}${current.userName}`,
                userId: `${userId}${index === 0 ? '' : ','}${current.userId}`,
                key:`${key}${index === 0 ? '' : ','}${current.key}`
            }
        }, {});
    }

    const iconMap = {
        [TYPES.CHECK_PART]: checkPartIcon,
        [TYPES.RECTIFY_PART]: rectifyPartIcon,
        [TYPES.MANAGE_PART]: managePartIcon
    }

    return (
        <div className={styles.partForm}>
            <Row wrap className={styles.rowLine}>
                <Col span={24} className={styles.colLine}>
                    <div className={styles.top}>
                        <div className={styles.lefticon}>
                            <img src={iconMap[tag]}/>
                            <span className={styles.innercontent}> {info.partName}</span>
                        </div>
                        <div className={styles.rightbit}>
                            {
                                showAdd &&
                                <span className={styles.plusicon}>
                                <PlusOutlined/>
                                 <span className={styles.addtext}
                                       onClick={() => formService.addCurrentParty(info)}>添加</span>

                             </span>
                            }
                            {
                                !info?.origin &&
                                <span className={styles.minusicon}>
                                    <MinusOutlined/>
                                    <span onClick={() => formService.deleteCurrentParty(info)}>删除</span>
                                </span>
                            }
                        </div>
                    </div>
                </Col>
                <Col span={24} className={styles.colLine}>
                    <Row>
                        <Col span={8} className={styles.innerLineTitle}>{titleMap[tag]?.person?.title}</Col>
                        <Col span={16} className={styles.innerLineValue}>
                            <JJSKWeakSearch
                                placeholder={formService.checkType === TYPES.OUTER_CHECK ? '' : '请选择(可多选)'}
                                allowClear={true}
                                readOnly={true}
                                style={{width: '100%'}}
                                onSearch={() => selectPerson(info)}
                                value={info?.userName}
                            />
                        </Col>
                    </Row>
                </Col>
                {
                    formService?.checkType === TYPES.OUTER_CHECK && restList.map(item => {
                        return <Col span={24} className={styles.colLine}>
                            <Row>
                                <Col span={8} className={styles.innerLineTitle}>{item.title}</Col>
                                <Col span={16}
                                     className={styles.innerLineValue}>{info?.[item.key]}</Col>
                            </Row>
                        </Col>
                    })
                }
            </Row>
        </div>
    );
};

export default forwardRef(PartForm);