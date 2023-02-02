import { useProductPopup } from "@hooks";
import { createContext } from "react";

import type {
  ProductPopupContextPrps,
  FiltersProvider as ContextProps,
} from "@types";

export const ProductPopupContext =
  createContext<ProductPopupContextPrps | null>(null);

export const ProductPopupProvider = ({ children }: ContextProps) => {
  const [showPopup, loadingPopup, product, dispatchPopup, fetchProductDetails] =
    useProductPopup();

  const val: ProductPopupContextPrps = {
    showPopup,
    loadingPopup,
    product,
    dispatchPopup,
    fetchProductDetails,
  };

  return (
    <ProductPopupContext.Provider value={val}>
      {children}
    </ProductPopupContext.Provider>
  );
};
