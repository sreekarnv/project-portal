import * as React from 'react';
import { FunnelFill } from 'react-bootstrap-icons';
import { Container, Form, Button, CloseButton, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const sidebarVariants = {
	open: { opacity: 1, x: 0, visibility: 'visible' },
	close: { opacity: 0, x: '-300px', visibility: 'hidden' },
};

const Sidebar = ({ showSideBar, setShowSidebar }) => {
	const [checkAvailable, setCheckAvailable] = React.useState(null);

	return (
		<>
			<motion.div
				initial={sidebarVariants.close}
				transition={{ ease: 'linear', duration: 0.1 }}
				animate={showSideBar ? sidebarVariants.open : sidebarVariants.close}
				{...{ variants: sidebarVariants }}
				className={`h-100 sidebar py-5 px-3 text-primary`}>
				<Container>
					<CloseButton
						onClick={() => setShowSidebar(false)}
						className='close-btn'
					/>
					<Card className='sidebar__card py-4 px-2 mb-5'>
						<div className='text-center'>
							<h3 className='mb-0 d-flex align-items-center justify-content-center'>
								<FunnelFill size={30} />
								<span className='ml-2'>Filter Options</span>
							</h3>
						</div>
					</Card>

					<Form>
						<div className='mb-5'>
							<Card className='sidebar__card py-3 px-3'>
								<h4 className='mb-3 text-black'>Availability</h4>
								<Form.Check
									className='custom-control'
									type='checkbox'
									onChange={() =>
										setCheckAvailable(
											checkAvailable === 'available' ? null : 'available'
										)
									}
									checked={checkAvailable === 'available'}
									label='Available'
									value='available'
								/>
								<Form.Check
									className='custom-control'
									type='checkbox'
									onChange={() =>
										setCheckAvailable(
											checkAvailable === 'not-offered' ? null : 'not-offered'
										)
									}
									checked={checkAvailable === 'not-offered'}
									label='Not Offered'
									value='not-offered'
								/>
							</Card>
						</div>
						<div className='mb-5'>
							<Card className='sidebar__card py-3 px-3'>
								<h4 className='mb-3 text-black'>Details</h4>

								<Form.Group>
									<Form.Label>Course Name</Form.Label>
									<Form.Control />
								</Form.Group>
								<Form.Group>
									<Form.Label>Course ID</Form.Label>
									<div className='d-flex'>
										<Form.Control as='select'>
											<option>BITS F</option>
											<option>CSE F</option>
											<option>ECE F</option>
											<option>EEE F</option>
											<option>IS F</option>
										</Form.Control>
										<Form.Control type='number' />
									</div>
								</Form.Group>

								<Form.Group>
									<Form.Label>Course Type</Form.Label>
									<Form.Control as='select'>
										<option>-</option>
										<option>Project</option>
										<option>Thesis</option>
									</Form.Control>
								</Form.Group>
							</Card>
						</div>
						<Card className='sidebar__card py-4 px-2'>
							<div className='text-center'>
								<Button size='sm'>Apply Filter</Button>
								<Button variant='danger' className='ml-2' size='sm'>
									Reset Filter
								</Button>
							</div>
						</Card>
					</Form>
				</Container>
			</motion.div>
		</>
	);
};

export default Sidebar;
