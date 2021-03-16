import * as React from 'react';
import { FilterContext } from '../context/FilterContext';

const useSort = () => {
	const { projects, setProjects } = React.useContext(FilterContext);

	const handleSort = (e, type) => {
		let result;
		if (type === 'asc')
			result = [...projects].sort((a, b) => {
				return a[e.target.name] < b[e.target.name]
					? -1
					: a[e.target.name] > b[e.target.name]
					? 1
					: 0;
			});
		else {
			result = [...projects].sort((a, b) => {
				let res =
					a[e.target.name] < b[e.target.name]
						? -1
						: a[e.target.name] > b[e.target.name]
						? 1
						: 0;
				return res * -1;
			});
		}
		setProjects(result);
	};

	return { handleSort };
};

export default useSort;
