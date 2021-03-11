import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Header = () => {
	return (
		<Navbar
			style={{ zIndex: 15, position: 'sticky', top: 0, left: 0 }}
			bg='primary'
			expand='lg'
			variant='dark'>
			<Container>
				<Navbar.Brand href='#home'>Project Portal</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Header;
