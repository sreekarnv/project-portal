import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import FilterContextProvider from './app/context/FilterContext';
import ProjectContextProvider from './app/context/ProjectContext';
import ReviewContextProvider from './app/context/ReviewContext';
import './scss/main.scss';

const app = (
	<React.StrictMode>
		<ProjectContextProvider>
			<ReviewContextProvider>
				<FilterContextProvider>
					<App />
				</FilterContextProvider>
			</ReviewContextProvider>
		</ProjectContextProvider>
	</React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
