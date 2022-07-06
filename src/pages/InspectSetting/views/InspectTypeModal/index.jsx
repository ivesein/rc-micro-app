import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Form, Space, message } from "antd";
import styles from "./index.module.scss";
import closeIcon from "@/assets/close.svg";
import BillsForm from "../../components/BillsForm";
import { initFormFields } from "./constant";
import {
	addOrUpdateInspectTypeRequest,
	getNewTypeCodeRequest,
} from "../../data-source/async";
// 资源维护表单
const InspectTypeModal = ({ record, isEdit, modal, reload }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const getNewTypeCode = useCallback(async () => {
		const data = await getNewTypeCodeRequest();
		data &&
			form.setFieldsValue({
				...form.getFieldsValue(),
				typeCode: data,
			});
	}, [form]);
	useEffect(() => {
		if (record) {
			const { typeDesc, typeName, typeCode } = record;
			form.setFieldsValue({
				...form.getFieldsValue(),
				typeName,
				typeCode,
				typeDesc,
			});
		} else {
			getNewTypeCode();
		}
	}, [record, form, getNewTypeCode]);
	const handleClick = async () => {
		try {
			const values = await form.validateFields();
			const params = {
				businessType: "1",
				...values,
			};
			if (record) {
				params.id = record.id;
			}
			setLoading(true);
			const res = await addOrUpdateInspectTypeRequest(params);
			res && message.success(isEdit ? "编辑成功！" : "新建成功！");
			reload();
			setLoading(false);
			modal.destroy();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.inspectTypeForm}>
			<div className={styles.titleWrap}>
				<span>{`检查类型${isEdit ? "编辑" : "新增"}`}</span>
				<img
					onClick={(e) => {
						if (loading) return false;
						modal.destroy();
					}}
					className={styles.closeIcon}
					src={closeIcon}
					alt="关闭"
				/>
			</div>
			<div className={styles.tableWrap}>
				<BillsForm
					form={form}
					onValuesChange={null}
					onFinish={null}
					formFields={initFormFields}
				/>
			</div>

			<div className={styles.boxWrap}>
				<Space>
					<Button
						disabled={loading}
						style={{ width: "120px", height: "48px" }}
						onClick={() => modal.destroy()}
					>
						取消
					</Button>
					<Button
						loading={loading}
						style={{ width: "120px", height: "48px" }}
						type="primary"
						onClick={() => handleClick()}
					>
						确定
					</Button>
				</Space>
			</div>
		</div>
	);
};

export default InspectTypeModal;
