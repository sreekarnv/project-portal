import React from 'react';
import { Button } from 'react-bootstrap';
import './icon-button.scss';

const IconButton = ({ className, floating, children, href, onClick }) => {
	let classes = className;

	if (floating) {
		classes = `${className} floating-btn`;
	}

	return (
		<Button
			component='a'
			{...{ href, onClick }}
			className={`icon-btn ${classes}`}>
			{children}
		</Button>
	);
};

export default IconButton;
