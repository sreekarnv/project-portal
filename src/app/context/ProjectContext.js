import * as React from 'react';

import { DBContext } from './dbContext';

export const ProjectContext = React.createContext();

const ProjectContextProvider = ({ children }) => {
	const {db, initComplete, dbExists, projectCollection} = React.useContext(DBContext);

	const [projects, setProjects] = React.useState(null);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		if(initComplete) {
			if(dbExists) {
				setLoading(false);
			} else {
				(async () => {
					setLoading(true);
		
					try {
						const res = await fetch('data.json', {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								Accept: 'application/json',
							},
						});
		
						const data = await res.json();
	
						projectCollection.insert(data);
	
					} catch (err) {}
					setLoading(false);
				})();
		
			}
		}
	}, [initComplete]);

	return (
		<ProjectContext.Provider value={{ projects, loading }}>
			{children}
		</ProjectContext.Provider>
	);
};

export default ProjectContextProvider;
