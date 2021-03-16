import * as React from 'react';
import { ProjectContext } from './ProjectContext';

export const FilterContext = React.createContext();

const FILTER_OPTION_KEYS = ['courseType', 'department', 'projectType'];

// const FILTER_OPTION_KEYS = [
// 	'courseType',
// 	'department',
// 	'projectType',
// 	'projectTime',
// ];

const FilterContextProvider = ({ children }) => {
	const { projects, loading } = React.useContext(ProjectContext);
	const [updatedProjects, setUpdatedProjects] = React.useState();
	const [sidebarFilteredProjects, setSidebarFilteredProjects] = React.useState(
		[]
	);

	const [filterOptions, setFilterOptions] = React.useState({
		projectType: {
			Formal: false,
			Informal: false,
		},
		courseType: {
			LOP: false,
			DOP: false,
			SOP: false,
		},
		// projectTime: {
		// 	previousSem: false,
		// 	upcomingSem: false,
		// },
		department: {
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
	});

	const resetFilterOptions = () => {
		setFilterOptions({
			projectType: {
				Formal: false,
				Informal: false,
			},
			courseType: {
				LOP: false,
				DOP: false,
				SOP: false,
			},
			// projectTime: {
			// 	previousSem: false,
			// 	upcomingSem: false,
			// },
			department: {
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
		});

		setUpdatedProjects(projects);
		setSidebarFilteredProjects(projects);
		setSidebarFilteredProjects([]);
	};

	const updateFilterOptions = (newFilterOptions) => {
		setFilterOptions(newFilterOptions);
	};

	const applyFilter = () => {
		const newFilterOptions = { ...filterOptions };
		let filters = [];
		FILTER_OPTION_KEYS.forEach((el) => {
			Object.keys(newFilterOptions[el]).forEach((el2) => {
				if (newFilterOptions[el][el2]) {
					filters.push(el2);
				}
			});
		});

		// Project Type Filter
		///////////////////////////////////////////////////////////
		let isFormal = undefined;
		if (filters.includes('Formal')) {
			isFormal = 'Formal';
			filters = filters.filter((el) => el !== 'Formal');
		} else if (filters.includes('Informal')) {
			isFormal = 'Informal';
			filters = filters.filter((el) => el !== 'Informal');
		}

		if (isFormal !== undefined && filters.length === 0) {
			setUpdatedProjects(() => {
				return projects.filter((p) => {
					if (isFormal === 'Formal') {
						return p.isFormal === true;
					} else {
						return p.isFormal === false;
					}
				});
			});
		}

		///////////////////////////////////////////////////////
		// Course Type Filter
		let ProjectType = [];
		if (filters.includes('DOP')) {
			ProjectType.push('DOP');
			filters = filters.filter((el) => el !== 'DOP');
		}
		if (filters.includes('LOP')) {
			ProjectType.push('LOP');
			filters = filters.filter((el) => el !== 'LOP');
		}
		if (filters.includes('SOP')) {
			ProjectType.push('SOP');
			filters = filters.filter((el) => el !== 'SOP');
		}

		if (ProjectType.length > 0) {
			let projectsNew = [];
			ProjectType.forEach((el) => {
				projectsNew = [...projects.filter((el2) => el2.ProjectType === el)];
			});

			if (isFormal === 'Formal' || isFormal === 'Informal') {
				projectsNew = projectsNew.filter(
					(el) => el.isFormal === (isFormal === 'Formal' ? true : false)
				);
			}
			setUpdatedProjects(projectsNew);
		}

		//////////////////////////////////////////////////////////
		// Department Filter
		if (filters.length > 0) {
			let projectsNew = [];
			filters.forEach((el) => {
				projectsNew = [
					...projectsNew,
					...projects.filter((el2) => el2.Department === el),
				];
			});

			if (isFormal === 'Formal' || isFormal === 'Informal') {
				projectsNew = projectsNew.filter(
					(el) => el.isFormal === (isFormal === 'Formal' ? true : false)
				);
			}

			if (ProjectType.length > 0) {
				console.log('el', ProjectType);
				ProjectType.forEach((el) => {
					projectsNew = [
						...projectsNew.filter((el2) => el2.ProjectType === el),
					];
				});
			}

			setUpdatedProjects(projectsNew);
			setSidebarFilteredProjects(projectsNew);
		}
		/////////////////////////////////////////////////////////////////
	};

	React.useEffect(() => {
		if (!loading && projects) {
			setUpdatedProjects(projects);
		}
	}, [loading, projects]);

	return (
		<FilterContext.Provider
			value={{
				loading,
				projects: updatedProjects,
				setProjects: setUpdatedProjects,
				filterOptions,
				resetFilterOptions,
				updateFilterOptions,
				applyFilter,
				sidebarFilteredProjects,
				setSidebarFilteredProjects,
			}}>
			{children}
		</FilterContext.Provider>
	);
};

export default FilterContextProvider;
