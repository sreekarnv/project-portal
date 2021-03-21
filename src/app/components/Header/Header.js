import React from 'react';
import './header.scss';
import { Container, Navbar } from 'react-bootstrap';

const Header = () => {
	return (
		<Navbar id='header' expand='lg' variant='dark'>
			<Container fluid className='justify-content-center pt-3'>
				<Navbar.Brand>BPHC Project Portal</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Header;
