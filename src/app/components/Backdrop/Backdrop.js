import React from 'react';
import './backdrop.scss';
import { AnimatePresence, motion } from 'framer-motion';

const backDropVariants = {
	show: {
		visibility: 'visible',
		opacity: 1,
		zIndex: 5,
	},
	hide: {
		visibility: 'hidden',
		opacity: 0,
		zIndex: 5,
	},
};

const Backdrop = ({ onClick, show }) => {
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					variants={backDropVariants}
					initial={false}
					animate={'show'}
					exit='hide'
					{...{ onClick }}
					className='d-block d-lg-none backdrop'></motion.div>
			)}
		</AnimatePresence>
	);
};

export default Backdrop;
