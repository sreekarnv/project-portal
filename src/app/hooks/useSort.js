import * as React from 'react';
import { FilterContext } from '../context/FilterContext';

const useSort = () => {
	const { searchedProjects, setSearchedProjects, sortedProjected, setSortedProjects } = React.useContext(
		FilterContext
	);

	const [currentSort, setCurrentSort] = React.useState({
		target: 'ProjectTitle',
		type: 'asc'
	});

	const handleSort = (target, type) => {
		if (!searchedProjects) return;

		let result;
		if (type === 'asc')
			result = [...searchedProjects].sort((a, b) => {
				return a[target] < b[target]
					? -1
					: a[target] > b[target]
					? 1
					: 0;
			});
		else {
			result = [...searchedProjects].sort((a, b) => {
				let res =
					a[target] < b[target]
						? -1
						: a[target] > b[target]
						? 1
						: 0;
				return res * -1;
			});
		}

		setCurrentSort({
			target: target,
			type: type
		});

		setSortedProjects(result);
	};

	return { handleSort, currentSort, setCurrentSort };
};

export default useSort;
