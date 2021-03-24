import * as React from 'react';
import { ProjectContext } from './ProjectContext';

export const FilterContext = React.createContext();

const DEFAULT_FILTER_STATE = {
	isFormal: {
		Formal: false,
		Informal: false,
	},
	ProjectType: {
		LOP: false,
		DOP: false,
		SOP: false,
	},
	courseOffered: {
		previous: false,
		upcoming: false,
	},
	Department: {
		Chemical: false,
		Phoenix: false,
		Pharmacy: false,
		Math: false,
		Economics: false,
		Civil: false,
		Biology: false,
		'Computer Science': false,
		'Mechanical & Manufacturing': false,
	},
};

const FilterContextProvider = ({ children }) => {
	const { projects, loading } = React.useContext(ProjectContext);
	const [filteredProjects, setFilteredProjects] = React.useState(null);
	const [searchedProjects, setSearchedProjects] = React.useState([]);
	const [searchString, setSearchString] = React.useState('');
	const [filterOptions, setFilterOptions] = React.useState({
		...DEFAULT_FILTER_STATE,
		isFormal: {
			...DEFAULT_FILTER_STATE.isFormal,
		},
		Department: {
			...DEFAULT_FILTER_STATE.Department,
		},
		ProjectType: {
			...DEFAULT_FILTER_STATE.ProjectType,
		},
	});

	const resetFilterOptions = () => {
		setFilterOptions({
			...DEFAULT_FILTER_STATE,
			isFormal: {
				...DEFAULT_FILTER_STATE.isFormal,
			},
			Department: {
				...DEFAULT_FILTER_STATE.Department,
			},
			ProjectType: {
				...DEFAULT_FILTER_STATE.ProjectType,
			},
		});

		setFilteredProjects(projects);
		setSearchedProjects(projects);
	};

	const updateFilterOptions = (newFilterOptions) => {
		setFilterOptions(newFilterOptions);
	};

	const applyFilter = () => {
		let filteredProjects = projects;

		Object.keys(filterOptions).forEach((d) => {
			const subFilter = filterOptions[d];
			const shouldFilter = Object.values(subFilter).reduce(
				(final, val) => final || val,
				false
			);
			if (shouldFilter) {
				filteredProjects = filteredProjects.filter((project) => {
					let include = false;

					Object.keys(subFilter)
						.filter((key) => subFilter[key])
						.forEach((key) => {
							if (
								project[d] &&
								project[d].toLowerCase() === key.toLowerCase()
							) {
								include = true;
							}
						});

					return include;
				});
			}
		});

		setFilteredProjects(filteredProjects);
	};

	React.useEffect(() => {
		if (!loading && projects) {
			setFilteredProjects(projects);
			setSearchedProjects(projects);
		}
	}, [loading, projects]);

	return (
		<FilterContext.Provider
			value={{
				loading,
				filteredProjects,
				setFilteredProjects,
				filterOptions,
				resetFilterOptions,
				updateFilterOptions,
				applyFilter,
				searchedProjects,
				setSearchedProjects,
				searchString,
				setSearchString,
			}}>
			{children}
		</FilterContext.Provider>
	);
};

export default FilterContextProvider;
