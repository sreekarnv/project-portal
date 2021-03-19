import * as React from 'react';
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
import Loading from './components/Loader/Loading';
import useSearch from './hooks/useSearch';
import { FilterContext } from './context/FilterContext';
import useSort from './hooks/useSort';
import ReviewSidebar from './components/ReviewSidebar/ReviewSidebar';

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
	const [showSideBar, setShowSidebar] = React.useState(false);
	const { loading, searchedProjects } = React.useContext(FilterContext);
	const { searchText, handleSearch } = useSearch();
	const { handleSort } = useSort();

	const [showDetailedView, setShowDetailedView] = React.useState(false);
	const [projectDetail, setProjectDetail] = React.useState(null);

	const projects = searchedProjects;

	const cardColors = React.useRef(new Array(250).fill(0).map(d => Math.floor(Math.random() * 3) + 1));

	React.useEffect(() => {
		if (!showDetailedView) {
			setProjectDetail(null);
		}
	}, [showDetailedView]);

	if (loading) {
		return (
			<div className='vh-100 bg-dark d-flex justify-content-center align-items-center'>
				<Loading />
			</div>
		);
	}

	return (
		<>
			{showDetailedView && (
				<ReviewSidebar
					project={projectDetail}
					{...{ showDetailedView, setShowDetailedView }}
				/>
			)}

			<Header />

			<Container fluid>
				<AnimateSharedLayout>
					<Row className='cards-container'>
						<AnimatePresence>
							{showSideBar && (
								<motion.div
									variants={sidebarVariants}
									id='sidebar'
									key='sidebar'
									initial='close'
									animate='open'
									transition={{
										duration: 0.3,
										ease: 'easeOut',
									}}
									className='px-0 col-xl-2 col-lg-3 col-md-3 col-sm-11'>
									<Sidebar {...{ showSideBar, setShowSidebar }} />
								</motion.div>
							)}
						</AnimatePresence>

						<Backdrop
							className='d-lg-none'
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
										id='filter-row'
										key='filter-row'
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
												placeholder='Search by Project Title, Professor or Department'
												onChange={(e) => {
													handleSearch(e.target.value);
												}}
												value={searchText}
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
												<Dropdown.Item
													onClick={(e) => handleSort(e, 'asc')}
													name='ProjectTitle'
													className='text-light'>
													<SortAlphaDown size={20} />
													Project Title
												</Dropdown.Item>
												<Dropdown.Item
													onClick={(e) => handleSort(e, 'dec')}
													name='ProjectTitle'
													className='text-light'>
													<SortAlphaUp size={20} />
													Project Title
												</Dropdown.Item>
												<Dropdown.Item
													onClick={(e) => handleSort(e, 'asc')}
													name='Department'
													className='text-light'>
													<SortAlphaDown size={20} />
													Department
												</Dropdown.Item>
												<Dropdown.Item
													onClick={(e) => handleSort(e, 'dec')}
													name='Department'
													className='text-light'>
													<SortAlphaUp size={20} />
													Department
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</motion.div>

									<Row
										className={`py-4 mt-3 ${showSideBar && 'p-show-sidebar'}`}>
										<AnimateSharedLayout>
											{projects &&
												projects.map((el, i) => {
													return (
														<motion.div
															layout
															transition={{ ease: 'easeOut' }}
															key={`${el}-${i}`}
															className={`col-xl-${
																showSideBar ? '4' : '3'
															} col-lg-${
																showSideBar ? '6' : '4'
															} col-md-6 col-sm-6 col-12`}>
															<div>
																<ProjectCard
																	number={i}
																	project={el}
																	showDetails={() => setShowDetailedView(true)}
																	showProjectDetails={setProjectDetail}
																	cardColors={cardColors.current}
																/>
															</div>
														</motion.div>
													);
												})}
										</AnimateSharedLayout>
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
