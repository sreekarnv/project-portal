import { useState } from 'react';
import { Row, Container, Button, Form } from 'react-bootstrap';
import { FunnelFill, SortDown } from 'react-bootstrap-icons';
import { motion } from 'framer-motion';
import ProjectCard from './components/ProjectCard';
import Sidebar from './components/Sidebar';
import Backdrop from './components/Backdrop';
import Header from './components/Header';

const App = () => {
	const [showSideBar, setShowSidebar] = useState(false);

	return (
		<>
			<Header />
			<Sidebar {...{ showSideBar, setShowSidebar }} />
			<Backdrop show={showSideBar} onClick={() => setShowSidebar(false)} />
			<Container className='vh-100'>
				<div className={`py-4`}>
					<h1 className='display-4 text-uppercase text-sm-center mb-4'>
						Projects
					</h1>

					<div className='d-flex align-items-center justify-content-between'>
						<Button
							className='ml-2'
							onClick={() => setShowSidebar(!showSideBar)}>
							<FunnelFill size={20} />
							<span className='ml-2'>Filter</span>
						</Button>

						<div className='form-inline'>
							<Form.Group className='mb-0' controlId='search'>
								<Form.Control type='text' placeholder='Search' />
							</Form.Group>

							<Button variant='secondary' className='ml-3'>
								<SortDown size={20} />
								<span className='ml-2'>Sort</span>
							</Button>
						</div>
					</div>

					<Row className='py-3'>
						{[1, 2, 3, 2, 3, 1].map((el, i) => {
							return (
								<motion.div
									layout
									key={`${el}-${i}`}
									className={`col-xl-4 col-md-6 col-sm-6  col-12`}>
									<ProjectCard number={el} />
								</motion.div>
							);
						})}
					</Row>
				</div>
			</Container>
		</>
	);
};

export default App;
