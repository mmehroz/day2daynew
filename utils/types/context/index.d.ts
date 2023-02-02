import {
  CurrentUserProps,
  ProductCardProps,
  ProductPopupDataProps,
} from "../data";
import { AddToCartFunc, ProductAddToCart } from "../utils";

export interface FiltersContext {
  fetchFilter: FetchFiltersAndClear;
  products: Array<ProductCardProps>;
  fetchingFilteredProduct: boolean;
  clearFilters: FetchFiltersAndClear;
  filters: Array<{ name: string; id: string }>;
}

interface FetchFiltersAndClear {
  (
    id: string,
    filtersId: Array<{ name: string; id: string }>,
    name?: string
  ): void;
}

export interface FiltersProvider {
  children: JSX;
}

export interface ProductPopupContextPrps {
  showPopup: boolean;
  loadingPopup: boolean;
  dispatchPopup: DispatchPopupProps;
  fetchProductDetails: FetchProductDetailsProps;
  product: ProductPopupDataProps;
}

interface DispatchPopupProps {
  (): void;
}

interface FetchProductDetailsProps {
  (slug: string): void;
}

export interface CartContextProps {
  product: Array<ProductAddToCart>;
  total: number;
  addToCart: AddToCartFunc;
  cartState: boolean;
  hideCart: dispatchCart;
  showCart: dispatchCart;
  productIncrement: AddToCartFunc;
  productDecreament: AddToCartFunc;
  clearCart: () => void;
  removeCart: AddToCartFunc;
}

interface dispatchCart {
  (): void;
}

export interface ModalContextProps {
  show: boolean;
  loginState: boolean;
  searchState: boolean;
  headerState: boolean;
  mobileAccountState: boolean;
  mobileCategoryState: boolean;
  message: string;
  modalType: "success" | "error";
  showModal: (message: string, type?: "success" | "error") => void;
  showSearch: () => void;
  hideSearch: () => void;
  showLogin: () => void;
  hideLogin: () => void;
  showHeader: () => void;
  hideHeader: () => void;
  showMobileAccount: () => void;
  hideMobileAccount: () => void;
  toggleMobileAccount: () => void;
  hideMobileCategory: () => void;
  showMobileCategory: () => void;
  toggleMobileCategory: () => void;
}

export interface UserContextProps {
  user: CurrentUserProps;
  setUser: (user: CurrentUserProps) => void;
  clearUser: () => void;
}
