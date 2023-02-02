import { createContext } from "react";

import type { FiltersProvider as ContextProps, CartContextProps } from "@types";
import { useCart } from "@hooks";

export const CartContext = createContext<CartContextProps | null>(null);

export const CartProvider = ({ children }: ContextProps) => {
  const [
    cart,
    total,
    addToCart,
    cartState,
    showCart,
    hideCart,
    productIncrement,
    productDecrement,
    clearCart,
    removeProduct,
  ] = useCart();

  const val: CartContextProps = {
    product: cart,
    total,
    addToCart,
    cartState: cartState,
    hideCart: hideCart,
    showCart: showCart,
    productIncrement: productIncrement,
    productDecreament: productDecrement,
    clearCart,
    removeCart: removeProduct,
  };

  return <CartContext.Provider value={val}>{children}</CartContext.Provider>;
};
