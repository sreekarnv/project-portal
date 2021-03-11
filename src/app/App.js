import { useState } from 'react';
import { Row, Container, Button, Form } from 'react-bootstrap';
import { FunnelFill, SortDown } from 'react-bootstrap-icons';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import ProjectCard from './components/ProjectCard/ProjectCard';
import Sidebar from './components/Sidebar/Sidebar';
import Backdrop from './components/Backdrop/Backdrop';
import Header from './components/Header/Header';

const sidebarVariants = {
	open: {
		opacity: 1,
		x: 0,
		visibility: 'visible',
		transition: { duration: 0.3, ease: 'linear' },
	},
	close: {
		opacity: 0,
		x: '-300px',
		visibility: 'hidden',
		transition: { duration: 0.3, ease: 'linear' },
	},
};

const App = () => {
	const [showSideBar, setShowSidebar] = useState(false);

	return (
		<>
			<Header />
			<Backdrop show={showSideBar} onClick={() => setShowSidebar(false)} />
			<Container fluid>
				<AnimateSharedLayout>
					<Row className='cards-container'>
						<AnimatePresence>
							{showSideBar && (
								<motion.div
									variants={sidebarVariants}
									initial='close'
									animate='open'
									className='w-100 px-0 col-lg-2'>
									<Sidebar {...{ showSideBar, setShowSidebar }} />
								</motion.div>
							)}
						</AnimatePresence>
						<motion.div
							layout
							className={`${!showSideBar ? 'offset-lg-1' : ''} col-lg-10`}>
							<Container fluid>
								<div className={`py-4`}>
									<div className='d-flex align-items-center justify-content-between mt-5'>
										<Button
											variant='outline-primary'
											className='btn-wide-xl btn-hover-text-dark'
											onClick={() => setShowSidebar(!showSideBar)}>
											<FunnelFill size={20} />
											<span>Filter</span>
										</Button>

										<div className='form-inline'>
											<Form.Group className='mb-0' controlId='search'>
												<Form.Control
													autoComplete='off'
													type='text'
													placeholder='Search by Name, Dept or Prof'
												/>
											</Form.Group>

											<Button
												variant='outline-secondary'
												className='ml-3 btn-wide-md'>
												<SortDown size={20} />
												<span>Sort</span>
											</Button>
										</div>
									</div>

									<Row
										style={{ padding: `${showSideBar ? '0 170px' : ''}` }}
										className='py-4 mt-3'>
										{[1, 2, 3, 2, 3, 1].map((el, i) => {
											return (
												<motion.div
													layout
													key={`${el}-${i}`}
													className={`col-xl-${
														showSideBar ? '4' : '3'
													} col-md-6 col-sm-6 col-12`}>
													<div>
														<ProjectCard number={el} />
													</div>
												</motion.div>
											);
										})}
									</Row>
								</div>
							</Container>
						</motion.div>
					</Row>
				</AnimateSharedLayout>
			</Container>
		</>
	);
};

export default App;
