import { ProductAddToCart } from "@types";
import { memo, useState, useCallback, useMemo, useEffect } from "react";

export function useCart(): [
  Array<ProductAddToCart>,
  number,
  (product: ProductAddToCart) => void,
  boolean,
  () => void,
  () => void,
  (product: ProductAddToCart) => void,
  (product: ProductAddToCart) => void,
  () => void,
  (product: ProductAddToCart) => void
] {
  const [cart, setCart] = useState<Array<ProductAddToCart>>([]);
  const [total, _setTotal] = useState<number>(0);
  const [showCart, setShowCart] = useState<boolean>(false);

  const memoizeCart = useMemo(() => cart, [cart]);
  const memoizeShowCart = useMemo(() => showCart, [showCart]);

  useEffect(() => {
    if (!cart?.length) return;

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (!localCart?.length) return;

    const parseCart = JSON.parse(localCart);
    setCart(parseCart);
  }, []);

  const addToCart = useCallback(
    (product: ProductAddToCart) => {
      // console.log(product);
      // console.log("product from add to cart");
      const prev = memoizeCart;
      const isExist = prev.find((el) => el?.slug === product?.slug);
      if (isExist && !product?.selectedVariants?.length) {
        setCart((prev) => {
          const existedProduct = prev.find((el) => el?.slug === product?.slug);
          const item = prev.filter((el) => el.slug !== existedProduct.slug);

          // console.log("Original price: ", existedProduct?.discount_price);

          item.push({
            ...existedProduct,
            quantity: existedProduct?.quantity + 1,
            discount_price:
              existedProduct?.discount_price + existedProduct?.originalPrice,
          });
          return item;
        });
        return;
      }

      prev.push({
        ...product,
        originalPrice: product?.originalPrice
          ? product?.originalPrice
          : product.discount_price,
      });
      setCart(prev);
    },
    [memoizeCart]
  );

  const incrementQuantity = useCallback(
    (product: ProductAddToCart) => {
      setCart((prev) => {
        const data = prev?.filter((el, i) => el?.slug !== product?.slug);
        let total: number = 0;
        let variantPrice: number = 0;

        const productFromState = prev?.find(
          (el, i) => el?.slug === product?.slug
        );

        productFromState?.selectedVariants?.forEach((el, i) => {
          variantPrice += el?.price;
        });

        data.push({
          ...product,
          quantity: product.quantity + 1,
          discount_price:
            product?.originalPrice + product?.discount_price + variantPrice,
        });

        return data;
      });
    },
    [memoizeCart]
  );

  const decrementQuantity = useCallback(
    (product: ProductAddToCart) => {
      setCart((prev) => {
        let variantPrice: number = 0;

        const data = prev?.filter((el, i) => el?.slug !== product?.slug);
        const productFromState = prev?.find(
          (el, i) => el?.slug === product?.slug
        );

        productFromState?.selectedVariants?.forEach((el, i) => {
          variantPrice += el?.price;
        });

        data.push({
          ...product,
          quantity: product.quantity - 1,
          discount_price:
            product?.discount_price -
            productFromState?.originalPrice -
            variantPrice,
        });
        return data;
      });
    },
    [memoizeCart]
  );

  const setShowCartTrue = useCallback(() => {
    setShowCart(true);
  }, [showCart]);

  const setShowCartFalse = useCallback(() => {
    setShowCart(false);
  }, [showCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }, [memoizeCart]);

  const removeProductFromCart = useCallback(
    (product: ProductAddToCart) => {
      const newCart = memoizeCart?.filter((el) => el.slug !== product?.slug);
      // console.log("product: ", product);
      // console.log("new cart: ", newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    },
    [memoizeCart]
  );

  return [
    memoizeCart,
    total,
    addToCart,
    memoizeShowCart,
    setShowCartTrue,
    setShowCartFalse,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    removeProductFromCart,
  ];
}
