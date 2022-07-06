import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	useRef,
} from "react";
import { Space, Button, Pagination, Modal, Drawer } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import CusTable from "./views/CusTable";
import InspectTypeModal from "./views/InspectTypeModal";
import InspectTypeDetail from "./views/InspectTypeDetail";

import PopModal from "@/common/PopConfirm";
import styles from "./index.module.scss";
import { JJSKSearch } from "jjsk-common-web";
import checkBtnPerm from "@/utils/checkBtnPerm";
import { inspectSettingPerm } from "./constant";
import {
	getInspectTypeRequest,
	deleteInspectTypeRequest,
} from "../InspectSetting/data-source/async";
import { usePagination } from "@/components/CustomHooks/pagination";
const { SEARCH, DELETE, UPDATE, CREATE } = inspectSettingPerm;
const { cusConfirm } = PopModal;
const InspectSetting = () => {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [detailVisible, setDetailVisible] = useState(false);

	const searchRef = useRef(null);
	const recordRef = useRef(null);

	const {
		paginationOptions,
		setTotal,
		total,
		currentPage,
		setCurrentPage,
		pageSize,
	} = usePagination();
	const getInspectTypeList = useCallback(async () => {
		setLoading(true);
		const params = {
			current: currentPage,
			size: pageSize,
		};
		if (searchRef.current) {
			params.title = searchRef.current;
		}
		const data = await getInspectTypeRequest(params);
		console.log(data);
		const { records, total, size } = data || {};
		setTotal(total ?? 0);
		setTableData(
			() =>
				records?.map((v, index) => ({
					...v,
					cIndex: (currentPage - 1) * pageSize + index + 1,
				})) ?? []
		);
		setLoading(false);
	}, [currentPage, pageSize, setTotal]);
	useEffect(() => {
		getInspectTypeList();
	}, [currentPage, pageSize]);
	const goDetail = useCallback((record) => {
		console.log(record);
		recordRef.current = { ...record };
		setDetailVisible(true);
	}, []);
	const openModal = useCallback(
		(record = null, isEdit = false) => {
			const formModal = Modal.confirm({
				modalRender: () => (
					<InspectTypeModal
						record={record}
						modal={formModal}
						isEdit={isEdit}
						reload={() => {
							getInspectTypeList();
						}}
					/>
				),
				width: 560,
				height: 800,
				centered: true,
				maskClosable: false,
				destroyOnClose: true,
			});
		},
		[getInspectTypeList]
	);
	// 调删除接口
	const delInspectType = useCallback(
		async (id) => {
			const res = await deleteInspectTypeRequest(id);
			const { success } = res || {};
			if (success) {
				const remainTotal = Number(total) - 1;
				const pages = Math.ceil(remainTotal / Number(pageSize));
				if (pages >= currentPage) {
					getInspectTypeList();
				} else {
					setCurrentPage(pages);
				}
			}
		},
		[getInspectTypeList, total, pageSize, currentPage, setCurrentPage]
	);
	// 弹出删除确认对话框
	const goDelete = useCallback(
		(record) => {
			console.log(record);
			cusConfirm({
				title: "温馨提示",
				info: "确认要删除该检查类型吗？",
				agreeCallBack: () => delInspectType(record.id),
			});
		},
		[delInspectType]
	);
	const columns = useMemo(
		() => [
			{
				title: "序号",
				dataIndex: "cIndex",
				align: "center",
				width: 80,
				ellipsis: true,
			},
			{
				title: "类型编号",
				dataIndex: "typeCode",
				ellipsis: true,
				width: 120,
				render: (_, record) => (
					<span
						className={styles.typeCode}
						onClick={(e) => goDetail(record)}
					>
						{record?.typeCode ?? ""}
					</span>
				),
			},
			{
				title: "类型名称",
				ellipsis: true,
				dataIndex: "typeName",
				width: 150,
			},
			{
				title: "相关描述",
				ellipsis: true,
				dataIndex: "typeDesc",
				width: 250,
			},
			{
				title: "系统预设",
				ellipsis: true,
				dataIndex: "userId",
				width: 150,
				render: (text) =>
					text === "1" ? (
						<CheckOutlined
							style={{ fontSize: 14, color: "#52c41a" }}
						/>
					) : (
						<span style={{ fontSize: 14, color: "#2b2b2b" }}>
							-
						</span>
					),
			},
			{
				title: "操作",
				dataIndex: "operation",
				width: 180,
				render: (_, record) => {
					return (
						<Space size="middle">
							{checkBtnPerm(UPDATE) && record.userId !== "1" ? (
								<Button
									type="link"
									size="small"
									onClick={() => openModal(record, true)}
								>
									编辑
								</Button>
							) : null}
							{checkBtnPerm(DELETE) && record.userId !== "1" ? (
								<Button
									type="link"
									danger
									size="small"
									onClick={() => goDelete(record)}
								>
									删除
								</Button>
							) : null}
							<Button
								type="link"
								size="small"
								onClick={() => goDetail(record)}
							>
								详情
							</Button>
						</Space>
					);
				},
			},
		],
		[goDelete, goDetail, openModal]
	);
	const config = useMemo(
		() => ({
			showSelection: false,
			rowKey: "typeCode",
			bordered: false,
		}),
		[]
	);
	const onSearch = useCallback(
		(value) => {
			searchRef.current = value;
			if (currentPage === 1) {
				getInspectTypeList();
			} else {
				setCurrentPage(1);
			}
		},
		[currentPage, getInspectTypeList, setCurrentPage]
	);
	const closeDetail = useCallback(() => {
		setDetailVisible(false);
	}, []);
	return (
		<div className={styles.setting}>
			<div className={styles.titleWrapper}>
				<span className={styles.title}>检查设置列表</span>
				<Space>
					{checkBtnPerm(SEARCH) && (
						<JJSKSearch
							placeholder={"请输入类型名称"}
							style={{ width: 280, height: 40 }}
							onSearch={onSearch}
						/>
					)}
					{checkBtnPerm(CREATE) && (
						<Button
							type="primary"
							size="large"
							style={{ fontSize: 14 }}
							onClick={(e) => openModal()}
						>
							新建
						</Button>
					)}
				</Space>
			</div>
			<div className={styles.tableWrapper}>
				<CusTable
					config={config}
					loading={loading}
					columns={columns}
					dataSource={tableData}
				/>
			</div>
			<div className={styles.paginationWrapper}>
				<Pagination className="cusPagination" {...paginationOptions} />
			</div>
			<Drawer
				title="详情"
				width={600}
				closable={true}
				destroyOnClose={true}
				maskClosable={true}
				onClose={closeDetail}
				visible={detailVisible}
				className={styles.detailDraw}
				// getContainer={false}
				bodyStyle={{ padding: 0 }}
				headerStyle={{ flexDirection: "row-reverse" }}
				// style={{ position: "absolute" }}
			>
				<InspectTypeDetail
					data={recordRef?.current ?? null}
					close={closeDetail}
				/>
			</Drawer>
		</div>
	);
};

export default InspectSetting;
