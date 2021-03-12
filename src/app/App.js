import { useState } from 'react';
import { Row, Container, Button, Form, Dropdown } from 'react-bootstrap';
import {
	FunnelFill,
	SortDown,
	SortAlphaDown,
	SortAlphaUp,
} from 'react-bootstrap-icons';
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
							style={{ minHeight: 0 }}
							layout
							className={`mx-auto col-xl-10 col-lg-${
								showSideBar ? '9' : '10'
							} col-md-11 col-sm-11`}>
							<Container fluid>
								<div className='py-4'>
									<motion.div
										layout
										className={`filter-row mt-5 ${
											showSideBar ? 'p-show-sidebar' : ''
										}`}>
										<Button
											variant='outline-primary'
											className='btn-wide-md btn-hover-text-dark mb-4 mb-sm-0 filter-row__filter'
											onClick={() => setShowSidebar(!showSideBar)}>
											<FunnelFill size={20} />
											<span>Filter</span>
										</Button>

										<Form.Group
											className='mb-0 filter-row__search'
											controlId='search'>
											<Form.Control
												autoComplete='off'
												type='text'
												placeholder='Search by Name, Dept or Prof'
											/>
										</Form.Group>

										<Dropdown className='filter-row__dropdown w-100'>
											<Dropdown.Toggle
												className='btn-block mb-2 mb-sm-0'
												variant='outline-secondary'
												id='dropdown-basic'>
												<SortDown size={20} />
												<span>Sort</span>
											</Dropdown.Toggle>

											<Dropdown.Menu className='bg-dark w-100'>
												<Dropdown.Item className='text-light'>
													<SortAlphaDown size={20} /> Name
												</Dropdown.Item>
												<Dropdown.Item className='text-light'>
													<SortAlphaUp size={20} /> Name
												</Dropdown.Item>
												<Dropdown.Item className='text-light'>
													<SortAlphaDown size={20} /> Course
												</Dropdown.Item>
												<Dropdown.Item className='text-light'>
													<SortAlphaDown size={20} /> Course
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
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
