import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import Backdrop from '../Backdrop/Backdrop';
import './review-sidebar.scss';

const ReviewSidebar = ({ project, showDetailedView, setShowDetailedView }) => {
	const [showCourse, setShowCourse] = React.useState(true);
	const [showProf, setShowProf] = React.useState(false);

	console.log(project);

	return (
		<>
			<Backdrop
				show={showDetailedView}
				onClick={() => setShowDetailedView(false)}
			/>
			<div className='review-sidebar'>
				<h3 className='review-sidebar__projectTitle'>{project.ProjectTitle}</h3>
				<div className='review-sidebar__projectType'>
					<h6 className='text-primary'>
						{project.isFormal ? `Formal / ${project.ProjectType}` : 'InFormal'}
					</h6>
					<h6 className='text-white'>~ {project.Professor}</h6>
				</div>
				<Accordion defaultActiveKey='0'>
					<Card>
						<Card.Header className='d-flex align-items-center'>
							<Card.Title className='mb-0 mr-3'>Course Reviews</Card.Title>
							<Accordion.Toggle
								size='sm'
								onClick={() => {
									if (showProf) {
										setShowProf(!showProf);
									}
									setShowCourse(!showCourse);
								}}
								variant='secondary'
								as={Button}
								eventKey='0'>
								{showCourse ? 'Hide' : 'Show'}
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey='0'>
							<Card.Body>
								{project.projectReviews.length > 0 &&
									project.projectReviews.map((el) => {
										return <li>{el}</li>;
									})}
								{project.projectReviews.length === 0 && (
									<h5 className='text-danger'>No Reviews on this Course</h5>
								)}
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card>
						<Card.Header className='d-flex align-items-center'>
							<Card.Title className='mb-0 mr-3'>Professor Reviews</Card.Title>
							<Accordion.Toggle
								size='sm'
								onClick={() => {
									setShowProf(!showProf);
									if (showCourse) {
										setShowCourse(!showCourse);
									}
								}}
								variant='secondary'
								as={Button}
								eventKey='1'>
								{showProf ? 'Hide' : 'Show'}
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey='1'>
							<Card.Body>
								{project.profReviews.length > 0 &&
									project.profReviews.map((el) => {
										return <li>{el}</li>;
									})}
								{project.profReviews.length === 0 && (
									<h5 className='text-danger'>No Reviews on this Professor</h5>
								)}
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			</div>
		</>
	);
};

export default ReviewSidebar;
