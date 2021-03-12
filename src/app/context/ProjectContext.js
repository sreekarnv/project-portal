import * as React from 'react';

export const ProjectContext = React.createContext();

const ProjectContextProvider = ({ children }) => {
	const [projects, setProjects] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
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

				setProjects(data);
			} catch (err) {}

			setLoading(false);
		})();
	}, []);

	return (
		<ProjectContext.Provider value={{ projects, loading }}>
			{children}
		</ProjectContext.Provider>
	);
};

export default ProjectContextProvider;
