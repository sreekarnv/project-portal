import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './project-card.scss';
// import Img from './../../../assets/image.jpg';
import { ReviewContext } from '../../context/ReviewContext';
import Icon from '../Icon/Icon';

const ProjectCard = ({
	number,
	style,
	project,
	showProjectDetails,
	showDetails,
	cardColors,
}) => {
	const variant = cardColors[number];
	const [projectDetails, setProjectDetails] = React.useState(project);
	const { reviews } = React.useContext(ReviewContext);

	React.useEffect(() => {
		if (reviews) {
			const courseReviewIndex = reviews.projectReviews.findIndex(
				(el) => el.ProjectTitle === project.ProjectTitle
			);
			if (courseReviewIndex !== -1) {
				setProjectDetails(() => ({
					...project,
					projectReviews: reviews.projectReviews[courseReviewIndex].review,
				}));
			} else {
				setProjectDetails({
					...project,
					projectReviews: [],
				});
			}

			const profReviewIndex = reviews.profReviews.findIndex(
				(el) => el.Professor === project.Professor
			);

			if (profReviewIndex !== -1) {
				setProjectDetails((prev) => ({
					...prev,
					profReviews: reviews.profReviews[profReviewIndex].review,
				}));
			} else {
				setProjectDetails((prev) => ({
					...prev,
					profReviews: [],
				}));
			}
		}
	}, [project, reviews]);

	return (
		<Card
			style={style}
			className={`card-project mx-auto mb-3 card-gradient-${variant}`}>
			<Card.Body>
				<div className='card-project__header mb-4'>
					<Card.Title className='text-white'>
						{`${number + 1}`.length === 1 ? `0${number + 1}` : number + 1}
					</Card.Title>

					<div className='card-project__header-image'>
						<Icon icon={project.Department} />
					</div>
				</div>
				<div className='card-project__details mb-5'>
					<Card.Subtitle
						style={{ fontWeight: 'bold' }}
						className='text-uppercase mb-4'>
						{project.courseOffered === 'upcoming'
							? 'Offered in SEM 2, 2021'
							: 'Previously Offered'}
					</Card.Subtitle>

					<Card.Subtitle className='mb-2 card-project__details-id'>
						{project.isFormal === 'Formal'
							? `FORMAL / ${project.ProjectType}`
							: 'INFORMAL'}
					</Card.Subtitle>
					<Card.Title className='card-project__details-name'>
						{project.ProjectTitle}
					</Card.Title>
				</div>
				<div className='card-project__prof mb-4 text-white'>
					<Card.Text className='text-uppercase card-project__prof-name mb-1 text-truncate'>
						{project.Professor}
					</Card.Text>
					<small>{project.Department}</small>
				</div>
				<Button
					variant={`light card-gradient-${variant}__cta`}
					onClick={() => {
						showProjectDetails(projectDetails);
						showDetails();
					}}>
					View
				</Button>
			</Card.Body>
		</Card>
	);
};

export default ProjectCard;
