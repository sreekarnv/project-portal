import * as React from 'react';
import { Container, Form, Button, CloseButton, Card } from 'react-bootstrap';
import { FilterContext } from '../../context/FilterContext';
import Checkbox from '../Checkbox/checkbox.js';
import useSearch from '../../hooks/useSearch';
import './sidebar.scss';
import Backdrop from '../Backdrop/Backdrop';

const Sidebar = ({ setShowSidebar, showSideBar }) => {
	const {
		updateFilterOptions,
		filterOptions,
		applyFilter,
		resetFilterOptions,
		filteredProjects,
		searchString,
	} = React.useContext(FilterContext);

	const { handleSearch } = useSearch();
	const first = React.useRef(true);

	React.useEffect(() => {
		if (!first.current) handleSearch(searchString);
		first.current = false;

		// eslint-disable-next-line
	}, [filteredProjects]);

	const handleFilter = (e) => {
		const key = e.target.name.split('-')[0];
		const subFilter = e.target.name.split('-')[1];
		const value = e.target.checked;

		let newFilterOptions = { ...filterOptions };

		if (newFilterOptions.isFormal.Formal && subFilter === 'Informal') {
			newFilterOptions.isFormal.Formal = false;
			Object.keys(newFilterOptions.ProjectType).forEach((k) => {
				newFilterOptions.ProjectType[k] = false;
			});
		} else if (newFilterOptions.isFormal.Informal && subFilter === 'Formal') {
			newFilterOptions.isFormal.Informal = false;
		}

		newFilterOptions[key][subFilter] = value;

		updateFilterOptions(newFilterOptions);
	};

	return (
		<>
			<Backdrop
				className='d-lg-none'
				show={showSideBar}
				onClick={() => setShowSidebar(false)}
			/>

			<div className={`h-100 sidebar pb-5 px-3 text-primary`}>
				<Container className='pb-5'>
					<CloseButton
						onClick={() => setShowSidebar(false)}
						className='close-btn'
					/>

					<Form>
						<div className='mb-3'>
							<Card className='sidebar__card py-3 pr-3'>
								<h4 className='mb-3 text-black'>Project Types</h4>
								<Checkbox
									name='isFormal-Formal'
									label='Formal'
									onChange={(e) => handleFilter(e)}
									checked={
										filterOptions.isFormal.Formal ||
										filterOptions.ProjectType.DOP ||
										filterOptions.ProjectType.LOP ||
										filterOptions.ProjectType.SOP
									}
								/>
								<Checkbox
									name='isFormal-Informal'
									label='Informal'
									onChange={(e) => handleFilter(e)}
									checked={filterOptions.isFormal.Informal}
									disabled={
										filterOptions.ProjectType.DOP ||
										filterOptions.ProjectType.LOP ||
										filterOptions.ProjectType.SOP
									}
								/>
							</Card>
						</div>

						<div className='mb-3'>
							<Card className='sidebar__card py-3 pr-3'>
								<h4 className='mb-3 text-black'>Course Types</h4>
								<Checkbox
									name='ProjectType-LOP'
									label='LOP'
									onChange={(e) => handleFilter(e)}
									checked={filterOptions.ProjectType.LOP}
									disabled={filterOptions.isFormal.Informal}
								/>
								<Checkbox
									name='ProjectType-DOP'
									label='DOP'
									onChange={(e) => handleFilter(e)}
									checked={filterOptions.ProjectType.DOP}
									disabled={filterOptions.isFormal.Informal}
								/>
								<Checkbox
									name='ProjectType-SOP'
									label='SOP'
									onChange={(e) => handleFilter(e)}
									checked={filterOptions.ProjectType.SOP}
									disabled={filterOptions.isFormal.Informal}
								/>
							</Card>
						</div>

						<div className='mb-3'>
							<Card className='sidebar__card py-3 pr-3'>
								<h4 className='mb-3 text-black'>Course Offered</h4>
								<Checkbox
									name='courseOffered-previous'
									label='Previous Semester'
									onChange={(e) => handleFilter(e)}
									checked={filterOptions.courseOffered.previous}
									disabled={filterOptions.isFormal.Informal}
								/>
								<Checkbox
									name='courseOffered-upcoming'
									label='Upcoming Semester'
									onChange={(e) => handleFilter(e)}
									checked={filterOptions.courseOffered.upcoming}
									disabled={filterOptions.isFormal.Informal}
								/>
							</Card>
						</div>

						<div className='mb-3'>
							<Card className='sidebar__card py-3 pr-3'>
								<h4 className='mb-3 text-black'>Departments</h4>
								<div className='row'>
									<div className='col-sm-6'>
										<Checkbox
											name='Department-Chemical'
											label='Chemical'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.Department.Chemical}
										/>
										<Checkbox
											name='Department-Pharmacy'
											label='Pharmacy'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.Department.Pharmacy}
										/>
										<Checkbox
											name='Department-Economics'
											label='Economics'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.Department.Economics}
										/>
										<Checkbox
											name='Department-Biology'
											label='Biology'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.Department.Biology}
										/>
										<Checkbox
											name='Department-Computer Science'
											label='Computer Science'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.Department['Computer Science']}
										/>
										<Checkbox
											name='Department-Mechanical & Manufacturing'
											label='Mechanical &amp; Manufcaturing'
											onChange={(e) => handleFilter(e)}
											checked={
												filterOptions.Department['Mechanical & Manufacturing']
											}
										/>

										<Checkbox
											name='Department-Mechanical'
											label='Mechanical'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.Department['Mechanical']}
										/>
									</div>
									<div className='col-sm-6'>
										<Checkbox
											name='Department-Phoenix'
											label='Phoenix'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.Department.Phoenix}
										/>
										<Checkbox
											name='Department-Math'
											label='Math'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.Department.Math}
										/>
										<Checkbox
											name='Department-Civil'
											label='Civil'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.Department.Civil}
										/>
									</div>
								</div>
							</Card>
						</div>
						<div className='card sidebar__card py-4 px-2 b-0 u-bb-none'>
							<Button
								variant='outline-primary'
								onClick={() => {
									first.current = false;
									applyFilter();
									handleSearch(searchString);
									setShowSidebar(false);
								}}
								className='btn-block btn-outline'>
								Apply Filter
							</Button>
							<Button
								onClick={() => {
									resetFilterOptions();
									setShowSidebar(false);
								}}
								variant='outline-danger'
								className='my-2 btn-block btn-outline'>
								Reset Filter
							</Button>
						</div>
					</Form>
					<div className='credits-container'>
						<p className='text-white small'>
							Designed and Developed by
							<span className='font-weight-bold'> Sreekar NV</span>,
							<span className='font-weight-bold'> Sidharth Anand</span> &amp;
							<span className='font-weight-bold'> Jonathan Samuel</span>
						</p>
					</div>
				</Container>
			</div>
		</>
	);
};

export default Sidebar;
