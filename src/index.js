import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './scss/main.scss';

const app = (
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
