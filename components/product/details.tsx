import { memo } from 'react';

import type { ProductAdditionalDetailsProps } from '@types';
import Link from 'next/link';

function ProductAdditionalDetails({
	sku,
	category,
	tags,
	quantity,
	barcode,
	brand,
	loading,
}: ProductAdditionalDetailsProps) {
	return (
		<div className='w-full flex flex-col gap-4'>
			<div className='flex gap-2 items-center font-primary text-primaryText text-sx'>
				{loading ? (
					<>
						<div className='w-11 h-3 rounded-md bg-gray-300 animate-pulse' />
						<div className='w-20 h-3 rounded-md bg-gray-300 animate-pulse' />
					</>
				) : (
					<>
						<h2 className='font-semibold'>SKU:</h2>
						<h2 className=''>{sku}</h2>
					</>
				)}
			</div>
			<div className='flex gap-2 items-center font-primary text-primaryText text-sx'>
				{loading ? (
					<>
						<div className='w-20 h-3 rounded-md bg-gray-300 animate-pulse' />
						<div className='w-16 h-3 rounded-md bg-gray-300 animate-pulse' />
					</>
				) : (
					<>
						<h2 className='font-semibold'>Category:</h2>
						<h2 className=''>{category}</h2>
					</>
				)}
			</div>

			<div className='flex gap-2 items-center font-primary text-primaryText text-sx'>
				{loading ? (
					<>
						<div className='w-16 h-3 rounded-md bg-gray-300 animate-pulse' />
						<div className='w-28 h-3 rounded-md bg-gray-300 animate-pulse' />
					</>
				) : (
					<>
						<h2 className='font-semibold'>Brand:</h2>
						<h2 className=''>{brand?.name}</h2>
					</>
				)}
			</div>
		</div>
	);
}

export default memo(ProductAdditionalDetails);
