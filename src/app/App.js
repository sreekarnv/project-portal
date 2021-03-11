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
			<Container fluid className='cards-container'>
				<div className={`py-4`}>
					{/* <h1 className="d-inline display-4 font-weight-bold">6</h1>
					<h3 className='text-sm-left mb-4 d-inline ml-2'>
						Formal &amp; Informal Projects
					</h3> */}

					<div className='d-flex align-items-center justify-content-between mt-5'>
						<Button variant="outline-primary"
							className='btn-wide-xl'
							onClick={() => setShowSidebar(!showSideBar)}>
							<FunnelFill size={20} />
							<span className=''>Filter</span>
						</Button>

						<div className='form-inline'>
							<Form.Group className='mb-0' controlId='search'>
								<Form.Control type='text' placeholder='Search by Name, Dept or Prof' />
							</Form.Group>

							<Button variant='outline-secondary' className='ml-3 btn-wide-md'>
								<SortDown size={20} />
								<span className=''>Sort</span>
							</Button>
						</div>
					</div>

					<Row className='py-4 mt-3'>
						{[1, 2, 3, 2, 3, 1].map((el, i) => {
							return (
								<motion.div
									layout
									key={`${el}-${i}`}
									className={`col-xl-3 col-md-6 col-sm-6  col-12`}>
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
