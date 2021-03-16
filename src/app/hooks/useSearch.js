import React from 'react';
import { FilterContext } from '../context/FilterContext';
import { ProjectContext } from '../context/ProjectContext';

const useSearch = () => {
	const { projects: initialProjects } = React.useContext(ProjectContext);
	const { setProjects, projects, sidebarFilteredProjects } = React.useContext(
		FilterContext
	);
	const [searchText, setSearchText] = React.useState('');

	const handleSearch = (value) => {
		setSearchText(value);
		if (sidebarFilteredProjects.length > 0) {
			setProjects(() => {
				return sidebarFilteredProjects.filter(
					(p) =>
						p.ProjectTitle.toLowerCase().includes(value.toLowerCase()) ||
						p.Professor.toLowerCase().includes(value.toLowerCase()) ||
						p.Department.toLowerCase().includes(value.toLowerCase())
				);
			});
		} else if (!projects || projects.length === 0) {
			setProjects(() => {
				return initialProjects.filter(
					(p) =>
						p.ProjectTitle.toLowerCase().includes(value.toLowerCase()) ||
						p.Professor.toLowerCase().includes(value.toLowerCase()) ||
						p.Department.toLowerCase().includes(value.toLowerCase())
				);
			});
		} else {
			setProjects(() => {
				return projects.filter(
					(p) =>
						p.ProjectTitle.toLowerCase().includes(value.toLowerCase()) ||
						p.Professor.toLowerCase().includes(value.toLowerCase()) ||
						p.Department.toLowerCase().includes(value.toLowerCase())
				);
			});
		}
	};

	return {
		handleSearch,
		searchText,
	};
};

export default useSearch;
