import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Accordion, CloseButton } from 'react-bootstrap';
import Backdrop from '../Backdrop/Backdrop';
import CollapseField from './CollapseField';
import './review-sidebar.scss';

const sidebarVariants = {
	open: {
		x: 0,
	},
	close: {
		x: 1000,
	},
};

const ReviewSidebar = ({ project, showDetailedView, setShowDetailedView }) => {
	const [showCourse, setShowCourse] = React.useState(true);
	const [showProf, setShowProf] = React.useState(false);
	const [showDesc, setShowDesc] = React.useState(true);
	const [showPreReq, setShowPreReq] = React.useState(false);
	const [showgettingStarted, setShowGettingStarted] = React.useState(false);
	const [showStudents, setShowStudents] = React.useState(false);

	const togglePreReq = () => {
		setShowCourse(false);
		setShowProf(false);
		setShowDesc(false);
		setShowStudents(false);
		setShowPreReq(!showPreReq);
	};

	const toggleDesc = () => {
		setShowCourse(false);
		setShowProf(false);
		setShowDesc(!showDesc);
		setShowPreReq(false);
		setShowStudents(false);
		setShowGettingStarted(false);
	};

	const toggleCourse = () => {
		setShowCourse(!showCourse);
		setShowProf(false);
		setShowGettingStarted(false);
		setShowDesc(false);
		setShowStudents(false);
		setShowPreReq(false);
	};

	const toggleProf = () => {
		setShowCourse(false);
		setShowProf(!showProf);
		setShowDesc(false);
		setShowGettingStarted(false);
		setShowPreReq(false);
		setShowStudents(false);
	};

	const toggleGettingStarted = () => {
		setShowGettingStarted(!showgettingStarted);
		setShowCourse(false);
		setShowProf(false);
		setShowDesc(false);
		setShowPreReq(false);
		setShowStudents(false);
	};

	const toggleStudents = () => {
		setShowStudents(!showStudents);
		setShowGettingStarted(false);
		setShowCourse(false);
		setShowProf(false);
		setShowDesc(false);
		setShowPreReq(false);
	};

	return (
		<>
			<AnimatePresence>
				{showDetailedView && (
					<>
						<Backdrop
							show={showDetailedView}
							onClick={() => setShowDetailedView(false)}
						/>
						<motion.div
							className='review-sidebar'
							variants={sidebarVariants}
							initial='close'
							animate='open'
							transition={{
								duration: 0.5,
								ease: 'easeInOut',
							}}
							exit='close'>
							<CloseButton
								onClick={() => setShowDetailedView(false)}
								className='close-btn'
							/>
							<h3 className='review-sidebar__projectTitle'>
								{project.ProjectTitle}
							</h3>
							<div className='review-sidebar__projectType'>
								<h5 className='text-white'>{project.Professor}</h5>
								<h6>
									Semester Offered:
									<span
										className={`text-uppercase ${
											project.courseOffered === 'upcoming'
												? 'text-success'
												: 'text-danger'
										}`}>
										&nbsp;{project.courseOffered}
									</span>
								</h6>
								<h6 className='text-primary'>
									{project.isFormal === 'Formal'
										? `Formal / ${project.ProjectType}`
										: 'Informal'}
								</h6>
							</div>
							<Accordion
								defaultActiveKey={
									project.courseOffered === 'upcoming' ? '0' : '2'
								}>
								{project.courseOffered === 'upcoming' && (
									<>
										<CollapseField
											label='Prerequisites'
											onClick={togglePreReq}
											show={showPreReq}
											i='0'>
											{project.Prerequisite ? (
												<h6 className='text-white'>{project.Prerequisite}</h6>
											) : (
												<h6 className='text-danger'>
													This project does not need any prerequisites
												</h6>
											)}
										</CollapseField>
										<CollapseField
											label='Description'
											onClick={toggleDesc}
											show={showDesc}
											i='1'>
											{project.ProjectDescription ? (
												<h6 className='text-white'>
													{project.ProjectDescription}
												</h6>
											) : (
												<h6 className='text-danger'>
													The professor has not provided a description for this
													project
												</h6>
											)}
										</CollapseField>
									</>
								)}
								{project.courseOffered.toLowerCase() === 'previous' && (
									<>
										<CollapseField
											label='Course Reviews'
											onClick={toggleCourse}
											show={showCourse}
											i='2'>
											{project.projectReviews.length > 0 &&
												project.projectReviews.map((el) => {
													return <p>{el}</p>;
												})}
											{project.projectReviews.length === 0 && (
												<h6 className='text-danger'>
													No one has reviewed this course yet
												</h6>
											)}
										</CollapseField>
										<CollapseField
											label='Professor Reviews'
											onClick={toggleProf}
											show={showProf}
											i='3'>
											{project.profReviews.length > 0 &&
												project.profReviews.map((el) => {
													return <p>{el}</p>;
												})}
											{project.profReviews.length === 0 && (
												<h6 className='text-danger'>
													No one has reviewed this professor yet
												</h6>
											)}
										</CollapseField>
										<CollapseField
											label='Getting Started'
											onClick={toggleGettingStarted}
											show={showgettingStarted}
											i='4'>
											{project.gettingStarted ? (
												project.gettingStarted
											) : (
												<h6 className='text-danger'>
													There are no getting started guides currently
													available for this domain
												</h6>
											)}
										</CollapseField>

										{(
												<CollapseField
													label='Contact'
													onClick={toggleStudents}
													show={showStudents}
													i='5'>
													{project.students.map((el) => {
														return (
															<div>
																<h6>{el.Name} - {el.Email.slice(0,9)}</h6>
															</div>
														);
													})}
												</CollapseField>
											)}
									</>
								)}
							</Accordion>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

export default ReviewSidebar;
