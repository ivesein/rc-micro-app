import React, { useState } from "react";

export const usePagination = () => {
	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const paginationOptions = {
		position: ["bottomRight"],
		showSizeChanger: true,
		showQuickJumper: true,
		showTotal: (total) => `共 ${total} 条， 每页 ${pageSize} 条`,
		total: total,
		pageSize: pageSize,
		onChange: (page, pageSize) => {
			setCurrentPage(page);
			setPageSize(pageSize);
		},
		current: currentPage,
		pageSizeOptions: [10, 20, 30, 50],
	};
	return {
		paginationOptions,
		total,
		setTotal,
		currentPage,
		setCurrentPage,
		pageSize,
		setPageSize,
	};
};
