import { memo, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

import { ContentDropdownProps } from '@types';

function ContentDropdown({
	title,
	content,
	custom,
	children,
}: ContentDropdownProps) {
	const [show, setShow] = useState(false);

	function toggleShow() {
		setShow(!show);
	}

	function render(): JSX.Element {
		if (custom) {
			return (
				show && (
					<motion.div
						initial={{ y: '10%', opacity: 0 }}
						animate={{ y: '0%', opacity: 1 }}
						exit={{ y: '10%', opacity: 0 }}
						className=' flex flex-col overflow-y-scroll w-full'>
						{children}
					</motion.div>
				)
			);
		}

		return (
			show &&
			content?.toString()?.length > 0 && (
				<motion.div
					initial={{ y: '10%', opacity: 0 }}
					animate={{ y: '-20%', opacity: 1 }}
					exit={{ y: '0%', opacity: 0 }}
					className='h-[10rem] flex flex-col overflow-y-scroll w-full mt-10'>
					<p
						dangerouslySetInnerHTML={{ __html: content }}
						className='text-base font-primary'></p>
				</motion.div>
			)
		);

		return <></>;
	}

	return (
		<div className='w-full flex flex-col gap-4 py-4'>
			<div
				onClick={toggleShow}
				className='w-full flex justify-between items-center font-primary text-primaryText hover:text-main duration-200 cursor-pointer transition'>
				<h2 className='font-bold text-base'>{title}</h2>
				<MdOutlineKeyboardArrowDown
					size={22}
					className={`transition duration-200 ${show && 'rotate-180'}`}
				/>
			</div>
			<AnimatePresence>{render()}</AnimatePresence>
		</div>
	);
}

export default memo(ContentDropdown);
//agile
//waterfall
//scrum
