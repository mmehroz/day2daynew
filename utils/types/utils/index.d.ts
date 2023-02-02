import { ChangeEvent } from 'react';

export interface ButtonPrimary
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
	icon?: boolean;
	loading?: boolean;
	Icon?: any;
	varaint?: 'main' | 'secondary' | 'white';
}

export interface DevicesFilters {
	title: string;
	id: string;
}

export interface Selector {
	checked?: boolean;
	handleClick?: any;
	id?: string | number;
	name?: string;
	slug?: string;
}

export interface ContentDropdownProps {
	title: string;
	content?: string | JSX;
	custom?: boolean;
	children?: JSX.Element;
}

export interface CustomCrousalProps {
	children?: JSX;
	hideBtns?: boolean;
}

export interface SelectDropdownProps {
	children?: JSX;
	title: string;
	type?: 'SIZES' | 'COLORS' | 'LIQUIDS' | 'BATTERIES' | 'CHARGERS' | 'CUSTOMS';
	selected?: string;
	showDropDown?: boolean;
	setShowDropdown?: any;
	varaint?: 'border';
}

export interface ProductAdditionalDetailsProps {
	sku: string;
	category: string;
	tags: string;
	quantity: string | number;
	barcode: string;
	brand: {
		name: string;
		slug: string;
	};
	loading: boolean;
}

export interface ProductHeaderProps {
	maincategory: Category;
	subcategory: Category;
	innercategory: Category;
}

export interface Category {
	name: string;
	slug: string;
	brands?: Array<{ name: string; slug: string }>;
}

export interface ImageHandlerProps {
	handleImage: any;
	imageURI: string;
	alt: string;
}

export interface HeaderDropdown {
	parent: string;
}

export interface AddToCartProps {
	product: ProductAddToCart;
	disabled?: boolean;
	btnsWidth?: string;
}

interface AddToCartFunc {
	(product: ProductAddToCart): void;
}

export interface ProductAddToCart {
	name: string;
	imageURI: string;
	selectedVariants: any;
	discount_price: number;
	selling_price: number;
	slug: string;
	quantity: number;
	originalPrice?: number;
	id?: string;
	sku?: string;
}

export interface InputLabel {
	title: string;
	Icon: JSX;
	handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	type?: string;
	value?: string;
	error?: boolean;
	errorMessage?: string;
	backgroundColor?: string;
	disabled?: boolean;
	padding?: string;
	loading?: boolean;
}

export interface RegisterProps {
	name: string;
	email: string;
	number: string;
	password: string;
	confirmPassword: string;
}

export interface RegisterPropsErrors {
	name: boolean;
	email: boolean;
	number: boolean;
	password: boolean;
	confirmPassword: boolean;
}

export interface RegisterPropsErrorMessage {
	name: string;
	email: string;
	number: string;
	password: string;
	confirmPassword: string;
}

export interface ChangePasswordProps {
	oldPassword: string;
	newPassword: string;
	newConfirmPassword: string;
}

export interface ChangePasswordErrorProps {
	oldPassword: boolean;
	newPassword: boolean;
	newConfirmPassword: boolean;
}
