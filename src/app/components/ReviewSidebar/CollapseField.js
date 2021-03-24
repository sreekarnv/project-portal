import React from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';
import { ChevronUp, ChevronDown } from 'react-bootstrap-icons';

const CollapseField = ({ onClick, show, children, i, label }) => {
	return (
		<Card>
			<Card.Header className='d-flex align-items-center'>
				<Card.Title className='mb-0 mr-3'>{label}</Card.Title>
				<Accordion.Toggle
					size='sm'
					onClick={onClick}
					variant='transparent'
					as={Button}
					eventKey={i}>
					{!show ? <ChevronUp fill='#fff' /> : <ChevronDown fill='#fff' />}
				</Accordion.Toggle>
			</Card.Header>
			<Accordion.Collapse eventKey={i}>
				<Card.Body>{children}</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
};

export default CollapseField;
