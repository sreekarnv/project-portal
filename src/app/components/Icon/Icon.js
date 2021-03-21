import React from 'react';
import { ReactComponent as PhoenixIcon } from './../../../assets/phoenix.svg';
import { ReactComponent as BioIcon } from './../../../assets/dna.svg';
import { ReactComponent as ChemicalIcon } from './../../../assets/chemical.svg';
import { ReactComponent as CivilIcon } from './../../../assets/civil.svg';
import { ReactComponent as CompScIcon } from './../../../assets/chip.svg';
import { ReactComponent as EcoIcon } from './../../../assets/economics.svg';
import { ReactComponent as ManufactureIcon } from './../../../assets/settings-gears.svg';
import { ReactComponent as PharmaIcon } from './../../../assets/drugs-capsules-and-pills.svg';
import { ReactComponent as MathIcon } from './../../../assets/math.svg';

import './icon.scss';

const Icon = ({ icon }) => {
	if (icon === 'Chemical' || icon === 'Chemistry') {
		return <ChemicalIcon className='icon' />;
	}

	if (icon === 'Biology' || icon === 'Biological Science') {
		return <BioIcon className='icon' />;
	}

	if (icon === 'Civil') {
		return <CivilIcon className='icon' />;
	}

	if (icon === 'Computer Science') {
		return <CompScIcon className='icon' />;
	}

	if (icon === 'Economics') {
		return <EcoIcon className='icon' />;
	}

	if (icon === 'Mechanical & Manufacturing') {
		return <ManufactureIcon className='icon' />;
	}

	if (icon === 'Pharmacy') {
		return <PharmaIcon className='icon' />;
	}

	if (icon === 'Math') {
		return <MathIcon className='icon' />;
	}

	return <PhoenixIcon className='icon' />;
};

export default Icon;
