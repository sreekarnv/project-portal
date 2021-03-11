import React from 'react';
import './backdrop.scss';
import { motion } from 'framer-motion';

const backDropVariants = {
	show: {
		visibility: 'visible',
		opacity: 1,
	},
	hide: {
		visibility: 'hidden',
		opacity: 0,
	},
};

const Backdrop = ({ onClick, show }) => {
	return (
		<motion.div
			variants={backDropVariants}
			initial='hide'
			animate={show ? 'show' : 'hide'}
			{...{ onClick }}
			className='d-block d-lg-none backdrop'></motion.div>
	);
};

export default Backdrop;
