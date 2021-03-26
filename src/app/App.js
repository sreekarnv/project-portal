import * as React from 'react';
import {
	Row,
	Container,
	Button,
	Form,
	Dropdown,
	Pagination,
} from 'react-bootstrap';

import {
	FunnelFill,
	SortDown,
	SortAlphaDown,
	ArrowUp,
	SortAlphaUp,
} from 'react-bootstrap-icons';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import ProjectCard from './components/ProjectCard/ProjectCard';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Loading from './components/Loader/Loading';
import useSearch from './hooks/useSearch';

import { FilterContext } from './context/FilterContext';
import useSort from './hooks/useSort';
import ReviewSidebar from './components/ReviewSidebar/ReviewSidebar';
import IconButton from './components/IconButton/IconButton';
import usePagination from './hooks/usePagination';

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
	const {
		loading,
		searchedProjects,
		searchString,
		sortedProjects,
		filteredProjects,
	} = React.useContext(FilterContext);

	const cardsContainerRef = React.useRef();
	const { handleSearch } = useSearch();
	const { handleSort, currentSort } = useSort();

	const [showDetailedView, setShowDetailedView] = React.useState(false);
	const [projectDetail, setProjectDetail] = React.useState(null);
	const [showfloatingBtn, setShowFloatingBtn] = React.useState(false);

	const projects = sortedProjects;

	const [page, setPage] = React.useState(1);
	const {
		start,
		end,
		handleNextPage,
		handlePrevPage,
		itemsPerPage,
	} = usePagination();

	const cardColors = React.useRef(
		new Array(400).fill(0).map((d) => Math.floor(Math.random() * 3) + 1)
	);

	const FloatingButton = (e) => {
		if (e.target.scrollTop >= 150) {
			setShowFloatingBtn(true);
		} else {
			setShowFloatingBtn(false);
		}
	};

	const toggleSidebar = () => {
		setShowSidebar(!showSideBar);
	};

	React.useEffect(() => {
		if (!showDetailedView) {
			setProjectDetail(null);
		}
	}, [showDetailedView]);

	React.useEffect(() => {
		handleSort(currentSort.target, currentSort.type);

		// eslint-disable-next-line
	}, [searchedProjects]);

	React.useEffect(() => {
		handleSearch(searchString, true);

		// eslint-disable-next-line
	}, [filteredProjects]);

	if (loading) {
		return (
			<div className='vh-100 bg-dark d-flex justify-content-center align-items-center'>
				<Loading />
			</div>
		);
	}

	return (
		<>
			<ReviewSidebar
				project={projectDetail}
				{...{ showDetailedView, setShowDetailedView }}
			/>

			<Header />

			<Container fluid>
				<AnimateSharedLayout>
					<Row
						className='cards-container'
						onScroll={(e) => FloatingButton(e)}
						ref={cardsContainerRef}>
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
											onClick={toggleSidebar}>
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
												value={searchString}
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
													onClick={(e) => handleSort(e.target.name, 'asc')}
													name='ProjectTitle'
													className='text-light'>
													<SortAlphaDown size={20} />
													Project Title
												</Dropdown.Item>
												<Dropdown.Item
													onClick={(e) => handleSort(e.target.name, 'dec')}
													name='ProjectTitle'
													className='text-light'>
													<SortAlphaUp size={20} />
													Project Title
												</Dropdown.Item>
												<Dropdown.Item
													onClick={(e) => handleSort(e.target.name, 'asc')}
													name='Department'
													className='text-light'>
													<SortAlphaDown size={20} />
													Department
												</Dropdown.Item>
												<Dropdown.Item
													onClick={(e) => handleSort(e.target.name, 'dec')}
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
												projects.length > 0 &&
												projects.slice(start, end).map((el, i) => {
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
																	number={i + start}
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
										{projects && projects.length === 0 && (
											<h5 className='text-danger mt-5 mx-auto'>
												No projects exist satisfying the given parameters
											</h5>
										)}
									</Row>
									<Container fluid={!showSideBar}>
										<Row className='justify-content-md-between justify-content-center align-items-center'>
											<div className='col-md-4 mx-sm-0 ml-0 my-auto my-md-0 mb-3 mb-md-0'>
												<p className='text-light text-center my-0 text-md-right text-lg-left'>
													Showing{' '}
													<b>
														{Math.min(
															Math.min(itemsPerPage(), projects.length),
															projects.length - (page - 1) * itemsPerPage()
														)}
													</b>{' '}
													of {projects.length} projects
												</p>
											</div>

											<Pagination size='lg' className='pr-0 pr-md-3'>
												<Pagination.Prev
													className={`card__pagination-item ${
														page <= 1 ? 'u-cursor-na' : ''
													}`}
													onClick={() => {
														if (page > 1) {
															handlePrevPage(page - 1);
															setPage(page - 1);
															cardsContainerRef.current.scrollTop = 0;
														}
													}}
													disabled={page <= 1}
												/>
												<Pagination.Item className='card__pagination-item'>
													{page}
												</Pagination.Item>
												<Pagination.Next
													className={`card__pagination-item ${
														projects && end >= projects.length
															? 'u-cursor-na'
															: ''
													}`}
													onClick={() => {
														if (end < projects.length) {
															handleNextPage(page + 1);
															setPage(page + 1);
															cardsContainerRef.current.scrollTop = 0;
														}
													}}
												/>
											</Pagination>
										</Row>
									</Container>
								</div>
							</Container>
						</motion.div>
					</Row>
				</AnimateSharedLayout>
			</Container>
			{showfloatingBtn && (
				<IconButton
					floating
					onClick={() => {
						cardsContainerRef.current.scrollTop = 0;
					}}>
					<ArrowUp size={21} />
				</IconButton>
			)}
		</>
	);
};

export default App;
