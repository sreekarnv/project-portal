import { useState } from 'react';
import { Row, Container, Button, Form, Dropdown } from 'react-bootstrap';
import { FunnelFill, SortDown } from 'react-bootstrap-icons';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import ProjectCard from './components/ProjectCard/ProjectCard';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Backdrop from './components/Backdrop/Backdrop';

const sidebarVariants = {
	open: {
		opacity: 1,
		visibility: 'visible',
		zIndex: 10,
	},
	close: {
		opacity: 0,
		visibility: 'hidden',
		zIndex: 10,
	},
};

const App = () => {
	const [showSideBar, setShowSidebar] = useState(false);

	return (
		<>
			<Header />

			<Container fluid>
				<Row className='cards-container'>
					<AnimateSharedLayout>
						<AnimatePresence>
							{showSideBar && (
								<motion.div
									variants={sidebarVariants}
									id='sidebar'
									key='sidebar'
									initial='close'
									animate='open'
									transition={{ duration: 0.3, type: 'spring', stiffness: 80 }}
									className='px-0 col-xl-2 col-lg-3 col-md-3 col-sm-11'>
									<Sidebar {...{ showSideBar, setShowSidebar }} />
								</motion.div>
							)}
						</AnimatePresence>

						<Backdrop
							show={showSideBar}
							onClick={() => setShowSidebar(false)}
						/>

						<motion.div
							layout
							className={`mx-auto col-xl-10 col-lg-${
								showSideBar ? '9' : '10'
							} col-md-11 col-sm-11`}>
							<Container fluid>
								<div className='py-4'>
									<motion.div
										layout
										className={`d-flex flex-column flex-sm-row justify-content-center align-items-center justify-content-md-between mt-5 ${
											showSideBar ? 'p-show-sidebar' : ''
										}`}>
										<div className='d-flex w-100 justify-content-center justify-content-sm-between'>
											<Button
												variant='outline-primary'
												className='btn-wide-md  w-50 w-sm-auto btn-hover-text-dark w-sm-0 mb-4 mb-sm-0'
												onClick={() => setShowSidebar(!showSideBar)}>
												<FunnelFill size={20} />
												<span>Filter</span>
											</Button>

											<Dropdown className='ml-sm-auto ml-0 w-50 w-sm-auto'>
												<Dropdown.Toggle
													className='mx-3 btn-wide-md mb-2 w-100 w-sm-auto mb-sm-0 '
													variant='outline-secondary'
													id='dropdown-basic'>
													<SortDown size={20} />
													<span>Sort</span>
												</Dropdown.Toggle>

												<Dropdown.Menu className='bg-dark'>
													<Dropdown.Item className='text-primary'>
														Name Ascending
													</Dropdown.Item>
													<Dropdown.Item className='text-secondary'>
														Name Descending
													</Dropdown.Item>
													<Dropdown.Item className='text-primary'>
														Course Ascending
													</Dropdown.Item>
													<Dropdown.Item className='text-secondary'>
														Course Descending
													</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
										</div>

										<div className='ml-0 ml-sm-auto w-100 w-sm-auto'>
											<Form.Group
												className='mb-0 ml-xl-auto w-100'
												controlId='search'>
												<Form.Control
													autoComplete='off'
													type='text'
													placeholder='Search by Title or Prof'
												/>
											</Form.Group>
										</div>
									</motion.div>

									<Row
										className={`py-4 mt-3 ${showSideBar && 'p-show-sidebar'}`}>
										{[1, 2, 3, 2, 3, 1].map((el, i) => {
											return (
												<motion.div
													layout
													key={`${el}-${i}`}
													className={`col-xl-${
														showSideBar ? '4' : '3'
													} col-lg-${
														showSideBar ? '6' : '4'
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
					</AnimateSharedLayout>
				</Row>
			</Container>
		</>
	);
};

export default App;
