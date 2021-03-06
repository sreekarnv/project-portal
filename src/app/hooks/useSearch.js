import React from 'react';
import { FilterContext } from '../context/FilterContext';
import { debounce } from 'lodash';

const useSearch = () => {
	const {
		filteredProjectsChain,
		searchedProjectsChain,
		setSearchedProjects,
		searchString,
		setSearchString,
		setSearchedProjectsChain,
	} = React.useContext(FilterContext);

	const handleSearch = (value, override) => {
		debounce(
			() => {
				setSearchedProjects(
					searchObject(
						value.length > searchString.length
							? searchedProjectsChain
							: filteredProjectsChain,
						value
					)
				);
			},
			override ? 1 : 250
		)();

		setSearchString(value);
	};

	const searchObject = (data, value) => {
		if (!data || !data.copy) return;

		const query = { $regex: [escape(value), 'i'] };

		const result = data.copy().find({
			$or: [
				{ ProjectTitle: query },
				{ Professor: query },
				{ Department: query },
			],
		});

		setSearchedProjectsChain(result);
		return result.data();
	};

	return {
		handleSearch,
	};
};

export default useSearch;
