import * as React from 'react';
import { FilterContext } from '../context/FilterContext';

const useSort = () => {
	const { searchedProjects, setSortedProjects, searchedProjectsChain } = React.useContext(
		FilterContext
	);

	const [currentSort, setCurrentSort] = React.useState({
		target: 'ProjectTitle',
		type: 'asc',
	});

	const handleSort = (target, type) => {
		if (!searchedProjectsChain || !searchedProjectsChain.collection) return;

		let result = searchedProjectsChain.copy().simplesort(target, type !== 'asc').data();

		setCurrentSort({
			target: target,
			type: type,
		});

		setSortedProjects(result);
	};

	return { handleSort, currentSort, setCurrentSort };
};

export default useSort;
