import React from 'react';
import './header.scss';
import { Container, Navbar } from 'react-bootstrap';

const Header = () => {
	return (
		<Navbar expand='lg' variant='dark'>
			<Container className='justify-content-center'>
				<Navbar.Brand href='#home'>BPHC Study Project Portal</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Header;
