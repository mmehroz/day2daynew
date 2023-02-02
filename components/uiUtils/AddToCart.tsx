import { memo, useContext, useCallback, useState } from "react";
import { v4 as uid } from "uuid";

import ButtonIncreament from "./ButtonIncreament";
import ButtonPrimary from "./ButtonPrimary";
import { CartContext, UiConext } from "@context";
import type { AddToCartProps, ProductAddToCart } from "@types";
import { useDimensions } from "@hooks";

function AddToCart({ product, disabled, btnsWidth }: AddToCartProps) {
  const { addToCart } = useContext(CartContext);
  const { showModal } = useContext(UiConext);
  const [dimension] = useDimensions();
  const [value, setValue] = useState(1);

  // console.log("product from parent: ", product);

  const handleClick = useCallback(
    (product: ProductAddToCart): void => {
      let variantPrice: number = 0;
      let total: number = 0;
      product?.selectedVariants?.forEach((el, i) => {
        variantPrice += el?.price;
      });

      total = variantPrice + product?.discount_price;
      if (value > 1) {
        total = variantPrice + product?.discount_price;
        total *= value;
      }

      addToCart({
        ...product,
        discount_price: total,
        quantity: value,
        originalPrice: product?.discount_price,
        slug: product?.selectedVariants?.length ? uid() : product?.slug,
      });
      showModal("Added to cart", "success");
    },
    [product, value]
  );

  const handleIncrement = useCallback(() => {
    // console.log("product quantity: ", product?.quantity);
    // console.log("value: ", value);
    if (product?.quantity === value) return;
    setValue((prev) => prev + 1);
  }, [value]);

  const handleDecrement = useCallback(() => {
    setValue((prev) => {
      if (prev === 1) {
        return prev;
      }

      return prev - 1;
    });
  }, [value]);

  if (dimension?.width <= 600) {
    return (
      <div className="flex justify-between w-full gap-4">
        <ButtonIncreament
          handleDec={handleDecrement}
          handleInc={handleIncrement}
          variant="large"
          totalQuantity={product?.quantity}
        />
        <ButtonPrimary
          onClick={() => handleClick(product)}
          title="Add To Cart"
          disabled={disabled}
          varaint="secondary"
          style={{
            width: "100%",
            color: "#1e293b",
          }}
        />
      </div>
    );
  }

  return (
    <>
      <ButtonIncreament
        handleDec={handleDecrement}
        handleInc={handleIncrement}
        totalQuantity={product?.quantity}
        width={btnsWidth}
      />
      <ButtonPrimary
        onClick={() => handleClick(product)}
        title="Add To Cart"
        disabled={disabled}
        varaint="secondary"
        style={{
          width: btnsWidth || "70%",
          color: "#1e293b",
        }}
      />
    </>
  );
}

export default memo(AddToCart);
