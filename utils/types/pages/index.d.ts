import { ProductSSRProps } from '../data';

export interface ProductPageProps {
	product: ProductSSRProps;
}

export interface ProductSelectVariant {
	name: string;
	id: string;
	price: number;
	imageURI: string;
	quantity: number;
	variantName: string;
	sku: string;
}

export interface ProductReviews {
	id: string;
	rating: number;
	review: string;
	user: {
		name: string;
		email: string;
	};
	createdAt: string;
}
