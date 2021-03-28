import * as React from 'react';
import { ProjectContext } from './ProjectContext';
import { DBContext } from './dbContext';

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
		upcoming: true,
	},
	Department: {
		Chemical: false,
		Chemistry: false,
		Physics: false,
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
	const { loading } = React.useContext(ProjectContext);
	const { projectCollection } = React.useContext(DBContext);

	const [filteredProjects, setFilteredProjects] = React.useState(null);
	const [searchedProjects, setSearchedProjects] = React.useState([]);
	const [sortedProjects, setSortedProjects] = React.useState([]);

	const [filteredProjectsChain, setFilteredProjectsChain] = React.useState(
		null
	);
	const [searchedProjectsChain, setSearchedProjectsChain] = React.useState(
		null
	);

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

	const resetArrayStates = () => {
		const chain = projectCollection.chain().find();
		const data = chain.data();

		setFilteredProjects(JSON.parse(JSON.stringify(data)));
		setSearchedProjects(JSON.parse(JSON.stringify(data)));
		setSortedProjects(JSON.parse(JSON.stringify(data)));

		setFilteredProjectsChain(JSON.parse(JSON.stringify(chain)));
		setSearchedProjectsChain(JSON.parse(JSON.stringify(chain)));
	};

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

		resetArrayStates();
	};

	const updateFilterOptions = (newFilterOptions) => {
		setFilterOptions(newFilterOptions);
	};

	const applyFilter = () => {
		// const start = Date.now();

		let filteredProjects = projectCollection.chain().find();

		Object.keys(filterOptions).forEach((d) => {
			const subFilter = filterOptions[d];
			const shouldFilter = Object.values(subFilter).reduce(
				(final, val) => final || val,
				false
			);
			if (shouldFilter) {
				const query = {};
				query[d] = {
					$in: Object.keys(subFilter).filter((key) => subFilter[key]),
				};

				filteredProjects = filteredProjects.find(query);
			}
		});

		setFilteredProjectsChain(filteredProjects);
		setFilteredProjects(filteredProjects.data());
	};

	React.useEffect(() => {
		if (!loading) {
			resetArrayStates();
			applyFilter();
		}
		// eslint-disable-next-line
	}, [loading, projectCollection]);

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
				sortedProjects,
				setSortedProjects,
				filteredProjectsChain,
				setFilteredProjectsChain,
				searchedProjectsChain,
				setSearchedProjectsChain,
			}}>
			{children}
		</FilterContext.Provider>
	);
};

export default FilterContextProvider;
