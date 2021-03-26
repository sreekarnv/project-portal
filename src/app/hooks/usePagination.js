import React from 'react';

const usePagination = () => {
	const [start, setStart] = React.useState(0);
	const [end, setEnd] = React.useState(37);

	const handleNextPage = (page) => {
		const prevEnd = end;
		setEnd(37 * page);
		setStart(prevEnd);
	};

	const handlePrevPage = (page) => {
		setEnd(37 * page);
		setStart(37 * (page - 1));
	};

	return { start, end, handleNextPage, handlePrevPage };
};

export default usePagination;
