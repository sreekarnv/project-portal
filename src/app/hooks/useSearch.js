import React from 'react';
import { FilterContext } from '../context/FilterContext';

const searchFields = ["ProjectTitle", "Professor", "Department"];

const useSearch = () => {
	const { filteredProjects, searchedProjects, setSearchedProjects } = React.useContext(
		FilterContext
	);
	const [searchText, setSearchText] = React.useState('');

	const handleSearch = (value) => {
		setSearchedProjects(searchObject(value.length > searchText.length ? searchedProjects : filteredProjects, value));

		setSearchText(value);
	};

	const searchObject = (data, value) => {
		if(!data)
			return;

		return data.filter(project => {
			return searchFields.reduce((val, field) => val || (project[field] && project[field].toLowerCase().includes(value.toLowerCase())), false);
		});
	};

	return {
		handleSearch,
		searchText,
	};
};

export default useSearch;
