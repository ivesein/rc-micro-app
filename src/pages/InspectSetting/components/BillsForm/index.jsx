import React from "react";
import { Form, Row, Col } from "antd";
import CusFormItemLabel from "../CusFormItemLabel";

const BillsForm = ({
	formFields,
	initialValues,
	onValuesChange,
	onFinish,
	formName,
	form,
	forDetail,
	layout,
}) => {
	// 渲染表单元素
	const renderFormItem = (items) => {
		return (
			items &&
			items.map((item) => {
				return (
					<Col
						span={item.block ? 24 : forDetail ? 12 : 8}
						key={item.name}
					>
						<Form.Item
							name={item.name}
							// labelCol={{ span: item.block ? 1 : 4 }}
							label={
								<CusFormItemLabel
									label={item.label}
									required={item.required}
								/>
							}
							required={item.required}
							rules={item.rules}
						>
							{item.field}
						</Form.Item>
					</Col>
				);
			})
		);
	};
	return (
		<Form
			style={{ width: "100%" }}
			form={form}
			// {...formItemLayout}
			wrapperCol={{
				xs: { span: 24 },
				sm: { span: 24 },
			}}
			colon={false}
			requiredMark={false}
			name={formName || ~~(Math.random() * 10)}
			initialValues={initialValues}
			onValuesChange={onValuesChange}
			onFinish={onFinish}
			layout={layout}
		>
			<Row gutter={24}>{renderFormItem(formFields)}</Row>
		</Form>
	);
};

export default BillsForm;
