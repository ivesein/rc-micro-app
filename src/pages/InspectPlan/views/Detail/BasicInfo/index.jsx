import React from 'react';
import commonTitleWrapperForDetail from "../../../../../components/HOC/DetailPanelWrapper";
import {detailFormTypeArrays} from "../../../common/config";
import {Col, Input, Row} from "antd";

const BasicInfoDetail = ({detailService}) => {
    const calculateStatus = (item) => {
        if(item.key === 'planStatus') {
            return detailService?.detail?.plan?.['planStatus'] === '0' ? '暂存' : '已发布'
        }
        if(item.key === 'gmtCreated') {
            return detailService?.detail?.plan?.['planStatus'] === '0' ?
                '-' :
                detailService?.detail?.plan?.gmtModified
        }

        return detailService?.detail?.plan?.[item.key]
    }

    return (
        <div style={{paddingTop:20}}>
            <Row wrap>
                {
                    detailFormTypeArrays.map(item => {
                        return <Col span={8} style={{height: 70}}>
                            <Row>
                                <Col
                                    span={6}
                                    style={{textAlign: 'right', paddingRight: 10,height:48,lineHeight:'48px'}}
                                >
                                    <span> {item.name}
                                    <span style={{paddingLeft: 8, color: 'red'}}>{item.required && '*'}</span></span>
                                </Col>
                                <Col span={17}>
                                    <Input
                                        style={{height: 48,width:'100%'}}
                                        value={calculateStatus(item)}
                                        disabled={true}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    })
                }
                <Col span={16} style={{display:'flex'}}>
                    <span style={{flex:6,textAlign:'right'}}>检查内容
                        <span style={{paddingLeft: 8, color: 'red',paddingRight:15}}>*</span>
                    </span>
                    <div
                        style={{flex:41,height:240,border:'1px solid #e6e6e6',marginRight:18,padding:10,overflow:'auto'}}
                        dangerouslySetInnerHTML={{__html:detailService?.detail?.plan?.checkContent}}
                    />
                </Col>
            </Row>
        </div>
    );
};
export default commonTitleWrapperForDetail(BasicInfoDetail)('检查信息');