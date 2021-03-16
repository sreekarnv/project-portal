import * as React from "react";
import {ProjectContext} from './ProjectContext'

export const FilterContext = React.createContext();

const FilterContextProvider = ({children}) => {
    const {projects, loading} = React.useContext(ProjectContext);
    const [displayProjects, setDisplayProjects] = React.useState(projects);
    const [filteredProjects, setFilteredProjects] = React.useState(projects);
    const [filters, setFilters] = React.useState(resetFilters());
    const [searchString, setSearchString] = React.useState("");

    React.useEffect(() => {
        setDisplayProjects(projects);
        setFilteredProjects(projects);
    }, [projects]);

    React.useEffect(() => {
        filterWithSearch(searchString);
    }, [searchString]);

    React.useEffect(() => {
        console.log(filters);
    }, [filters]);
    
    const searchParams = ["ProjectTitle", "Professor", "Department"];
    
    function resetFilters() {
        return {
            isFormal: {
                Formal: true,
                Informal: true,
            },
    
            ProjectType: {
                LOP: true,
                DOP: true,
                SOP: true,
            },
    
            ProjectTime: {
                previousSem: true,
                upcomingSem: true,
            },
    
            Department: {
                Chemical: true,
                Phoenix: true,
                Pharmacy: true,
                Math: true,
                Economics: true,
                Civil: true,
                Biology: true,
                "Computer Science": true,
                "Mechanical & Manufacturing": true,
            }
        }
    }
    
    function shouldAccept(project, key, subFilterObject) {
        if(project[key] === undefined) {
            return true;
        }
    
        Object.keys(subFilterObject).forEach(k => {
            if(project[key] === k)
                return true;
        });
    
        return false;
    
    }
    
    function filter() {
        setFilteredProjects(
            projects.filter(project => {
                const keys = Object.keys(filters);
    
                for(let i = 0; i < keys.length; i++) {
                    if(!shouldAccept(project, keys[i], filters[keys[i]]))
                        return false;
                }
    
                return true;
            })
        )
    }
    
    function filterWithSearch() {
        if(!filteredProjects)
            return;

        setDisplayProjects(
            filteredProjects.filter(project => {
                for(let i = 0; i < searchParams.length; i++) {
                    if(project[searchParams[i]] && project[searchParams[i]].toLowerCase().includes(searchString.toLowerCase()))
                        return true;
                }
    
                return false;
            })
        )
    }
    
    function handleSearch(e) {
        setSearchString(e.target.value);
        filterWithSearch();
    }
    
    function handleSort(e, type) {
        setDisplayProjects(
            displayProjects.sort((a, b) => {
                return type === "asc" && a[e.target.name] < b[e.target.name];
            })
        )
    }
    
    function handleFilterChanged(subFilter, target, checked) {
        setFilters({
            ...filters,
            [subFilter]: {
                ...filters[subFilter],
                [target]: checked
            }
        });
    }
    
    function handleFilterApply() {
        filter();
        filterWithSearch();
    }
    
    function handleFilterReset() {
        setFilters(resetFilters());
        filter();
        filterWithSearch();
    }

    return<FilterContext.Provider value={{
            projects, 
            loading,
            displayProjects,
            filteredProjects,
            filters,
            searchString,

            setDisplayProjects,
            setFilteredProjects,
            setFilters,
            setSearchString,
            resetFilters,

            handleSearch,
            handleSort,
            handleFilterChanged,
            handleFilterApply, 
            handleFilterReset,
    }}>
        {children}
    </FilterContext.Provider>

};

export default FilterContextProvider;