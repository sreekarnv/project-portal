import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import * as React from 'react';
import { Container, Form, Button, CloseButton, Card } from 'react-bootstrap';
import { FilterContext } from '../../context/FilterContext';
import Checkbox from '../Checkbox/Checkbox';
import './sidebar.scss';

const Sidebar = ({ setShowSidebar }) => {
	const {
		updateFilterOptions,
		filterOptions,
		applyFilter,
		resetFilterOptions,
	} = React.useContext(FilterContext);

	const handleFilter = (e) => {
		const key = e.target.name.split('-')[0];
		const subFilter = e.target.name.split('-')[1];
		const value = e.target.checked;

		let newFilterOptions = { ...filterOptions };

		///////////////////////////////////////////
		// Project Type Filter
		if (newFilterOptions.projectType.Formal && subFilter === 'Informal') {
			newFilterOptions.projectType.Formal = false;
			Object.keys(newFilterOptions.courseType).forEach((k) => {
				newFilterOptions.courseType[k] = false;
			});
		} else if (
			newFilterOptions.projectType.Informal &&
			subFilter === 'Formal'
		) {
			newFilterOptions.projectType.Informal = false;
		}
		//////////////////////////////////////////////////

		newFilterOptions[key][subFilter] = value;
		updateFilterOptions(newFilterOptions);
	};

	return (
		<AnimateSharedLayout>
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
									name='projectType-Formal'
									label='Formal'
									onChange={(e) => handleFilter(e)}
									checked={filterOptions.projectType.Formal}
								/>
								<Checkbox
									name='projectType-Informal'
									label='Informal'
									onChange={(e) => handleFilter(e)}
									checked={filterOptions.projectType.Informal}
								/>
							</Card>
						</div>
						<AnimatePresence>
							{filterOptions.projectType.Formal && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className='mb-3'>
									<Card className='sidebar__card py-3 pr-3'>
										<h4 className='mb-3 text-black'>Course Types</h4>
										<Checkbox
											name='courseType-LOP'
											label='LOP'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.courseType.LOP}
										/>
										<Checkbox
											name='courseType-DOP'
											label='DOP'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.courseType.DOP}
										/>
										<Checkbox
											name='courseType-SOP'
											label='SOP'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.courseType.SOP}
										/>
									</Card>
								</motion.div>
							)}
						</AnimatePresence>
						{/* 
						<motion.div layout className='mb-3'>
							<Card className='sidebar__card py-3 pr-3'>
								<h4 className='mb-3 text-black'>Project Time</h4>
								<Checkbox
									name='projectTime-previousSem'
									label='Previous Semesters'
									onChange={(e) => handleFilter(e)}
									checked={filterOptions.projectTime.previousSem}
								/>
								<Checkbox
									name='projectTime-upcomingSem'
									label='Upcoming Semester'
									onChange={(e) => handleFilter(e)}
									checked={filterOptions.projectTime.previousSem}
								/>
							</Card>
						</motion.div> */}
						<motion.div layout className='mb-3'>
							<Card className='sidebar__card py-3 pr-3'>
								<h4 className='mb-3 text-black'>Departments</h4>
								<div className='row'>
									<div className='col-sm-6'>
										<Checkbox
											name='department-Chemical'
											label='Chemical'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.department.Chemical}
										/>
										<Checkbox
											name='department-Pharmacy'
											label='Pharmacy'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.department.Pharmacy}
										/>
										<Checkbox
											name='department-Economics'
											label='Economics'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.department.Economics}
										/>
										<Checkbox
											name='department-Biology'
											label='Biology'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.department.Biology}
										/>
										<Checkbox
											name='department-Computer Science'
											label='Computer Science'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.department['Computer Science']}
										/>
										<Checkbox
											name='department-Mechanical & Manufacturing'
											label='Mechanical &amp; Manufcaturing'
											onChange={(e) => handleFilter(e)}
											checked={
												filterOptions.department['Mechanical & Manufacturing']
											}
										/>
									</div>
									<div className='department-col-sm-6'>
										<Checkbox
											name='department-Phoenix'
											label='Phoenix'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.department.Phoenix}
										/>
										<Checkbox
											name='department-Math'
											label='Math'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.department.Math}
										/>
										<Checkbox
											name='department-Civil'
											label='Civil'
											onChange={(e) => handleFilter(e)}
											checked={filterOptions.department.Civil}
										/>
									</div>
								</div>
							</Card>
						</motion.div>
						<motion.div
							layout
							className='card sidebar__card py-4 px-2 b-0 u-bb-none'>
							<Button
								variant='outline-primary'
								onClick={() => {
									applyFilter();
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
						</motion.div>
					</Form>
				</Container>
			</div>
		</AnimateSharedLayout>
	);
};

export default Sidebar;
