import * as React from 'react';
import { FilterContext } from '../context/FilterContext';

const useSort = () => {
	const { searchedProjects, setSearchedProjects } = React.useContext(FilterContext);

	const handleSort = (e, type) => {
		let result;
		if (type === 'asc')
			result = [...searchedProjects].sort((a, b) => {
				return a[e.target.name] < b[e.target.name]
					? -1
					: a[e.target.name] > b[e.target.name]
					? 1
					: 0;
			});
		else {
			result = [...searchedProjects].sort((a, b) => {
				let res =
					a[e.target.name] < b[e.target.name]
						? -1
						: a[e.target.name] > b[e.target.name]
						? 1
						: 0;
				return res * -1;
			});
		}
		setSearchedProjects(result);
	};

	return { handleSort };
};

export default useSort;
