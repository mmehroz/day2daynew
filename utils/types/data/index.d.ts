export interface ProductCardProps {
  width?: string;
  imageURI: string;
  name: string;
  short_description: string;
  selling_price: string;
  discount_price: string;
  slug: string;
}

export interface BrandsProps {
  name: string;
  slug: string;
  id: string;
}

export interface ProductSSRProps {
  slug: string;
  name: string;
  imageURI: string;
  short_description: string;
}

export interface ProductDetailProps {
  additional_info: string;
  code: string;
  discount_price: number;
  galleryImage: Array<string>;
  imageURI: string;
  inner_category: Category;
  main_category: Category;
  name: string;
  selling_price: number;
  quantity: number;
  short_description: string;
  sku: string;
  sub_category: Category;
  tags: Array<string>;
  variants: Array<VariantsProps>;
  long_description: string;
  id: string;
  brands: {
    name: string;
    slug: string;
  };
}

interface Category {
  name: string;
  slug: string;
  brands: Array<{ name: string; slug: string }>;
}
export interface VariantsProps {
  name: string;
  id: string;
  required: boolean;
  type: "SIZES" | "COLORS" | "LIQUIDS" | "BATTERIES" | "CHARGERS" | "CUSTOMS";
  variants: Array<VariantProps>;
}

export interface VariantProps {
  name: string;
  id: string;
  price: number;
  imageURI: string;
  quantity: number;
  sku: string;
}

export interface ProductPopupDataProps {
  discount_price: number;
  name: string;
  imageURI: string;
  short_description: string;
  selling_price: number;
  slug: string;
  quantity: number;
  variants: Array<VariantsProps>;
  brands: {
    name: string;
    slug: string;
    category: {
      slug: string;
    };
  };
}

export interface HeaderDropDownCategory {
  child: Array<CategoryDropdown>;
}

interface CategoryDropdown {
  name: string;
  slug: string;
  brands: Array<Category>;
  child: Array<Category>;
}

export interface SearchProductProps {
  slug: string;
  name: string;
  discount_price: number;
  selling_price: number;
  short_description: string;
  imageURI: string;
  hideSearch?: () => void;
}

export interface CurrentUserProps {
  name: string;
  email: string;
  number?: string;
  imageURI?: string;
  isExists: boolean | null;
}

export interface UserOrdersProps {
  id: string;
  total_price: string;
  order_id: number;
  order_status: "PROCESSING" | "SHIPPED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  address?: string;
}

export interface FooterContent {
  slug: string;
  title: string;
  imageURI: string;
  content: string;
  type: string;
}

export interface OrdersDataProps {
  Address: {
    address: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  subtotal: number;
  total_price: number;
  traction_id: string;
  order_status: string;
  order_id: number;

  orderProducts: Array<OrderProducts>;
}

interface OrderProducts {
  purchasedPrice: number;
  quantity: number;
  product: {
    sku: string;
    name: string;
    imageURI: string;
    short_description: string;
  };
  variants: Array<{ sku: string }>;
}
