import React from 'react';
import { FilterContext } from '../context/FilterContext';
import { debounce } from 'lodash';

const searchFields = ['ProjectTitle', 'Professor', 'Department'];

const useSearch = () => {
	const {
		filteredProjects,
		searchedProjects,
		setSearchedProjects,
		searchString,
		setSearchString,
	} = React.useContext(FilterContext);

	const handleSearch = (value) => {
		setSearchString(value);
		debounce(() => {
			setSearchedProjects(
				searchObject(
					value.length > searchString.length
						? searchedProjects
						: filteredProjects,
					value
				)
			);
		}, 850)();
	};

	const searchObject = (data, value) => {
		if (!data) return;

		return data.filter((project) => {
			return searchFields.reduce(
				(val, field) =>
					val ||
					(project[field] &&
						project[field].toLowerCase().includes(value.toLowerCase())),
				false
			);
		});
	};

	return {
		handleSearch,
	};
};

export default useSearch;
