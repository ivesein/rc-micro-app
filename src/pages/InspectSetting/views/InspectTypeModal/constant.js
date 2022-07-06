import CusFormItemInput from "../../components/CusFormItemInput";
import CusFormItemTextAear from "../../components/CusFormItemTextAear";

export const initFormFields = [
	{
		name: "typeCode",
		required: true,
		label: "类型编码",
		block: true,
		rules: [{ required: true, message: "请输入类型编码" }],
		field: <CusFormItemInput disabled={true} />,
	},
	{
		name: "typeName",
		required: true,
		label: "类型名称",
		block: true,
		rules: [{ required: true, message: "请输入类型名称" }],
		field: <CusFormItemInput maxLength={20} placeholder="请输入" />,
	},
	{
		name: "typeDesc",
		required: false,
		label: "相关描述",
		block: true,
		rules: [],
		field: (
			<CusFormItemTextAear
				style={{ width: "100%", height: 96 }}
				maxLength={400}
				placeholder="请输入描述"
			/>
		),
	},
];
