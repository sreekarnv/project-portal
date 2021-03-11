import * as React from 'react';
import { Container, Form, Button, CloseButton, Card } from 'react-bootstrap';
import Checkbox from '../Checkbox/checkbox';
import './sidebar.scss';

const Sidebar = ({ setShowSidebar }) => {
	return (
		<>
			<div className={`h-100 sidebar py-5 px-3 text-primary`}>
				<Container>
					<CloseButton
						onClick={() => setShowSidebar(false)}
						className='close-btn'
					/>

					<Form>
						<div className='mb-3'>
							<Card className='sidebar__card py-3 pr-3'>
								<h4 className='mb-3 text-black'>Project Types</h4>
								<Checkbox label='Formal'></Checkbox>
								<Checkbox label='Informal'></Checkbox>
							</Card>
						</div>
						<div className='mb-3'>
							<Card className='sidebar__card py-3 pr-3'>
								<h4 className='mb-3 text-black'>Course Types</h4>
								<Checkbox label='LOP'></Checkbox>
								<Checkbox label='DOP'></Checkbox>
								<Checkbox label='SOP'></Checkbox>
							</Card>
						</div>
						<div className='mb-3'>
							<Card className='sidebar__card py-3 pr-3'>
								<h4 className='mb-3 text-black'>Departments</h4>
								<div class='row'>
									<div class='col-sm-6'>
										<Checkbox label='Chemical'></Checkbox>
										<Checkbox label='Pharmacy'></Checkbox>
										<Checkbox label='Economics'></Checkbox>
										<Checkbox label='Biology'></Checkbox>
										<Checkbox label='Computer Science'></Checkbox>
										<Checkbox label='Mechanical &amp; Manufcaturing'></Checkbox>
									</div>
									<div class='col-sm-6'>
										<Checkbox label='Phoenix'></Checkbox>
										<Checkbox label='Math'></Checkbox>
										<Checkbox label='Civil'></Checkbox>
									</div>
								</div>
							</Card>
						</div>
						<Card className='sidebar__card py-4 px-2 b-0'>
							<Button
								variant='outline-primary'
								className='btn-block btn-outline'>
								Apply Filter
							</Button>
							<Button
								variant='outline-danger'
								className='my-2 btn-block btn-outline'>
								Reset Filter
							</Button>
						</Card>
					</Form>
				</Container>
			</div>
		</>
	);
};

export default Sidebar;
