import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import ProjectContextProvider from './app/context/ProjectContext';
import './scss/main.scss';

const app = (
	<React.StrictMode>
		<ProjectContextProvider>
			<App />
		</ProjectContextProvider>
	</React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
