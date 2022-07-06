import React from 'react';
import {titleMap} from "../../clean-data/config";
import TYPES from "../../../../../../constant";
import {Col, Row} from "antd";
import styles from './index.module.scss';

const InnerPartyDetail = ({info}) => {
    const checkParts = info?.filter(item => item.checkRelated === TYPES.CHECK_PART) ?? [];
    const rectifyParts = info?.filter(item => item.checkRelated === TYPES.RECTIFY_PART) ?? [];
    const manageParts = info?.filter(item => item.checkRelated === TYPES.MANAGE_PART) ?? [];
    return (
        <div className={styles.innerpart}>
            <Row wrap>
                <Col span={8}>
                    <Row wrap>
                        {
                            checkParts.map(item => <Col span={24}> {
                                <PartyForm info={item}/>
                            }</Col>)
                        }
                    </Row>
                </Col>
                <Col span={8}>
                    <Row wrap>
                        {
                            rectifyParts.map(item => {
                                return <>
                                <Col span={24}> {
                                         <PartyForm info={item}/>
                                    }</Col>
                                </>
                            })
                        }
                    </Row>
                </Col>
                <Col span={8}>
                    <Row wrap>
                        {
                            manageParts.map(item => <Col span={24}> {
                                <PartyForm info={item}/>
                            }</Col>)
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

const PartyForm = ({info}) => {
    return (
        <div className={styles.partform}>
            <div className={styles.top}>
                <img src={titleMap[info?.checkRelated]?.icon} alt=""/>
                <span className={styles.titlecontent}>{titleMap[info?.checkRelated]?.title}</span>
            </div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    {titleMap[info?.checkRelated]?.classify}
                    <span className={styles.star}>*</span>
                </div>
                <div className={styles.right}>{info.userName}</div>
            </div>
        </div>
    )
}

export default InnerPartyDetail;