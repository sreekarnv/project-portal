import React from 'react';
import { ReactComponent as PhoenixIcon } from './../../../assets/phoenix.svg';
import { ReactComponent as BioIcon } from './../../../assets/dna.svg';
import { ReactComponent as ChemicalIcon } from './../../../assets/chemical.svg';
import { ReactComponent as CivilIcon } from './../../../assets/compass.svg';
import { ReactComponent as CompScIcon } from './../../../assets/chip.svg';
import { ReactComponent as EcoIcon } from './../../../assets/economics.svg';
import { ReactComponent as ManufactureIcon } from './../../../assets/settings-gears.svg';
import { ReactComponent as PharmaIcon } from './../../../assets/drugs-capsules-and-pills.svg';
import { ReactComponent as MathIcon } from './../../../assets/axis.svg';
import { ReactComponent as PhysicsIcon } from './../../../assets/physics.svg';

import './icon.scss';

const Icon = ({ icon }) => {
	switch(icon) {
		case 'Chemical':
		case 'Chemistry':
			return <ChemicalIcon className='icon' />;
		case 'Biology':
		case 'Biological Science':
		case 'Biological Sciences':
			return <BioIcon className='icon' />;
		case 'Civil':
			return <CivilIcon className='icon' />;
		case 'Physics':
			return <PhysicsIcon className='icon' />;
		case 'Computer Science':
			return <CompScIcon className='icon' />;
		case 'Economics':
			return <EcoIcon className='icon' />;
		case 'Mechanical & Manufacturing':
		case 'Mechanical':
			return <ManufactureIcon className='icon' />;
		case 'Pharmacy':
			return <PharmaIcon className='icon' />;
		case 'Math':
		case 'Mathematics':
			return <MathIcon className='icon' />;
		default:
			return <PhoenixIcon className='icon' />;
	}
};

export default Icon;
