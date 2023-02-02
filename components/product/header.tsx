import { memo } from "react";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import type { ProductHeaderProps } from "@types";

function Header({
  maincategory,
  subcategory,
  innercategory,
}: ProductHeaderProps): JSX.Element {
  return (
		<div className='w-full flex items-center font-primary text-sx text-primaryText gap-2 mt-10 2xl:px-40'>
			<Link passHref href='/'>
				<h2 className='text-changecolor'>Home</h2>
			</Link>
			<MdOutlineKeyboardArrowRight size={20} />
			<Link passHref href={`/category/${maincategory?.slug}`}>
				<h2 className='text-changecolor'>{maincategory?.name}</h2>
			</Link>
			<MdOutlineKeyboardArrowRight size={20} />
			<Link
				passHref
				href={`/category/${maincategory?.slug}/${subcategory?.slug}`}>
				<h2 className='text-changecolor'>{subcategory?.name}</h2>
			</Link>
			<MdOutlineKeyboardArrowRight size={20} />
			<Link
				passHref
				href={`/category/${maincategory?.slug}/${subcategory?.slug}/${innercategory?.slug}`}>
				<h2 className='text-changecolor'>{innercategory?.name}</h2>
			</Link>
		</div>
	);
}

export default memo(Header);
