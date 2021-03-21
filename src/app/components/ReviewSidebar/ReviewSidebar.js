import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Accordion, Card, Button, CloseButton } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import Backdrop from '../Backdrop/Backdrop';
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
	const [showGuide, setShowGuide] = React.useState(false);

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
								<h6 className='text-primary'>
									{project.isFormal === 'Formal'
										? `Formal / ${project.ProjectType}`
										: 'InFormal'}
								</h6>
							</div>
							<Accordion defaultActiveKey='0'>
								<Card>
									<Card.Header className='d-flex align-items-center'>
										<Card.Title className='mb-0 mr-3'>
											Course Reviews
										</Card.Title>
										<Accordion.Toggle
											size='sm'
											onClick={() => {
												if (showProf) {
													setShowProf(!showProf);
												}
												setShowCourse(false);
												setShowGuide(false);
											}}
											variant='transparent'
											as={Button}
											eventKey='0'>
											{!showProf ? (
												<ChevronUp fill='#fff' />
											) : (
												<ChevronDown fill='#fff' />
											)}
										</Accordion.Toggle>
									</Card.Header>
									<Accordion.Collapse eventKey='0'>
										<Card.Body>
											{project.projectReviews.length > 0 &&
												project.projectReviews.map((el) => {
													return <p>{el}</p>;
												})}
											{project.projectReviews.length === 0 && (
												<h5 className='text-danger'>
													No one has reviewed this course yet
												</h5>
											)}
										</Card.Body>
									</Accordion.Collapse>
								</Card>
								<Card>
									<Card.Header className='d-flex align-items-center'>
										<Card.Title className='mb-0 mr-3'>
											Professor Reviews
										</Card.Title>
										<Accordion.Toggle
											size='sm'
											onClick={() => {
												setShowProf(false);
												if (showCourse) {
													setShowCourse(!showCourse);
												}
												setShowGuide(false);
											}}
											variant='transparent'
											as={Button}
											eventKey='1'>
											{!showCourse ? (
												<ChevronUp fill='#fff' />
											) : (
												<ChevronDown fill='#fff' />
											)}
										</Accordion.Toggle>
									</Card.Header>
									<Accordion.Collapse eventKey='1'>
										<Card.Body>
											{project.profReviews.length > 0 &&
												project.profReviews.map((el) => {
													return <p>{el}</p>;
												})}
											{project.profReviews.length === 0 && (
												<h5 className='text-danger'>
													No one has reviewed this professor yet
												</h5>
											)}
										</Card.Body>
									</Accordion.Collapse>
								</Card>
								<Card>
									<Card.Header className='d-flex align-items-center'>
										<Card.Title className='mb-0 mr-3'>
											Getting Started Guides
										</Card.Title>
										<Accordion.Toggle
											size='sm'
											onClick={() => {
												setShowProf(false);
												setShowCourse(false);
												if (showGuide) {
													setShowGuide(!showGuide);
												}
											}}
											variant='transparent'
											as={Button}
											eventKey='2'>
											{!showGuide ? (
												<ChevronUp fill='#fff' />
											) : (
												<ChevronDown fill='#fff' />
											)}
										</Accordion.Toggle>
									</Card.Header>
									<Accordion.Collapse eventKey='2'>
										<Card.Body>
											<h5 className='text-danger'>
												There are currently no getting started guides available for this
												or related domains
											</h5>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

export default ReviewSidebar;
