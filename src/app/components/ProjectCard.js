import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Img from './../../assets/image.jpg';

const ProjectCard = ({ number, style }) => {
	return (
		<Card
			style={style}
			className={`card-project mx-auto mb-3 card-gradient-${number}`}>
			<Card.Body>
				<div className='card-project__header mb-4'>
					<Card.Title className='text-white'>01</Card.Title>
					<div className='card-project__header-image'>
						<img src={Img} alt='Name' />
					</div>
				</div>
				<div className='card-project__details mb-5'>
					<Card.Subtitle className='mb-2 card-project__details-id'>
						IS F462
					</Card.Subtitle>
					<Card.Title className='card-project__details-name'>
						<span>Network</span>
						<br />
						<span>Programming</span>
					</Card.Title>
				</div>
				<div className='card-project__prof mb-4 text-white'>
					<Card.Text className='text-uppercase card-project__prof-name mb-1'>
						Paresh Saxsena
					</Card.Text>
					<small>
						Dpt. of Computer Science & Information Systems, BITS Pilani
					</small>
				</div>
				<Button variant={`light card-gradient-${number}__cta`}>View</Button>
			</Card.Body>
		</Card>
	);
};

export default ProjectCard;
