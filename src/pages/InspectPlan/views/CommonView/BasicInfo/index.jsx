import React, { useContext } from 'react';
import { Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { JJSKWeakSearch } from "jjsk-common-web";
import RichTextEditor from "./RichTextEditor";
import SelectProjectTable from "./SelectProjectTable";
import { commonTitleWrapperWithRef } from "../../../../../components/HOC/PannelWithTitle";
import { InspectFormContext } from "../../../context";
import { isSmallScreen } from "../../../common/adaptor";
import styles from './index.module.scss';

const { Option } = Select;
const BasicInfo = () => {
    const formService = useContext(InspectFormContext);

    // 根据不同类型展示不同的input
    const getInputTypeItem = item => {
        const { type, option } = item;
        const mapping = {
            text: <Input
                style={{
                    width: '100%',
                    height: 48,
                    fontSize: 14
                }}
                disabled={item.disabled}
                maxLength={100} />,
            list: <Select
                className='contract-basic-form-list'
                defaultValue={option && option.length > 0 ? option[0].value : ''}
                style={{ width: '100%', height: 48 }}
                disabled={item.disabled}
                onSelect={(value) => listChange(item, value)}
            >
                {
                    option && option.map(item => <Option value={item.value}>{item.title}</Option>)
                }
            </Select>,
            date: <DatePicker style={{ width: '100%', height: 48, fontSize: 14 }} />,
            search: <JJSKWeakSearch
                placeholder="请点击搜索框关联项目"
                allowClear={true}
                readOnly={true}
                style={{ height: 48, fontSize: 14 }}
                onSearch={() => selectProjectList()}
            />,
        }
        return mapping[type];
    }

    const selectProjectList = () => {
        Modal.confirm({
            title: '请选择项目',
            icon: null,
            content: <SelectProjectTable setProjectInfo={formService.setProjectInfo} />,
            okText: '确定',
            cancelText: '取消',
            width: 800,
            centered: true,
            maskClosable: true,
            destroyOnClose: false,
        })
    }

    const listChange = (item, value) => {
        const { key } = item;
        if (key === 'checkProperties') {
            formService.setCheckType(value);
        }
    }

    const onChangeRich = data => {
        formService.setRichTextDataAction(data);
    }

    return (
        <div className={styles.basicInfo}>
            <Form
                name="inspect-basic-info-form"
                form={formService.basicInfoForm}
                labelCol={{ span: isSmallScreen() ? 8 : 6 }}
                wrapperCol={{ span: isSmallScreen() ? 16 : 18 }}
                style={{ paddingTop: 20 }}
                initialValues={{ remember: true }}
            >
                <Row wrap>
                    {
                        formService.formType.map(item => <Col span={8}>
                            <Form.Item
                                label={item.name}
                                name={item.key}
                                colon={false}
                                labelAlign="right"
                                rules={item.rule ?? []}
                            >
                                {getInputTypeItem(item)}
                            </Form.Item>
                        </Col>)
                    }

                    <Col span={16}>
                        <Form.Item
                            label={'检查内容'}
                            labelCol={{ span: isSmallScreen() ? 4 : 3 }}
                            wrapperCol={{ span: 21 }}
                            name={'checkContent'}
                            colon={false}
                            labelAlign="right"
                            rules={[{ required: true, message: `请输入检查内容` }]}
                        >
                            <RichTextEditor onRef={onChangeRich} data={formService.richTextData} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default commonTitleWrapperWithRef(BasicInfo)('基本信息');