import React from 'react';

const ITEMS_PER_PAGE = 36;

const usePagination = () => {
	const [start, setStart] = React.useState(0);
	const [end, setEnd] = React.useState(ITEMS_PER_PAGE);

	const handleNextPage = (page) => {
		const prevEnd = end;
		setEnd(ITEMS_PER_PAGE * page);
		setStart(prevEnd);
	};

	const handlePrevPage = (page) => {
		setEnd(ITEMS_PER_PAGE * page);
		setStart(ITEMS_PER_PAGE * (page - 1));
	};

	const resetPagination = () => {
		setStart(0);
		setEnd(36);
	};

	const itemsPerPage = () => ITEMS_PER_PAGE;

	return {
		start,
		end,
		handleNextPage,
		handlePrevPage,
		itemsPerPage,
		resetPagination,
	};
};

export default usePagination;
