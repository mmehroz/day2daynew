import { memo, useState, useContext } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { ButtonIncreament } from "@uiUtils";
import { ProductAddToCart } from "@types";
import { CartContext } from "@context";

function Product(product: ProductAddToCart): JSX.Element {
  const [showDelete, setShowDelete] = useState(false);
  const { productIncrement, productDecreament, hideCart, removeCart } =
    useContext(CartContext);

  function handleInc(): void {
    productIncrement(product);
  }

  function handleDec(): void {
    if (product?.quantity > 1) {
      productDecreament({ ...product });
      return;
    }
  }

  return (
    <div className="flex gap-2 select-none">
      <div
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
        className="w-28 h-28 relative"
      >
        <Image
          src={product?.imageURI}
          fill
          className="object-cover  bg-backgroundColorThird rounded-md  duration-200 transition cursor-pointer"
          alt={product?.name}
          unoptimized
        />
        <AnimatePresence>
          {showDelete && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="w-full absolute cursor-pointer bg-black/40 flex h-full items-center justify-center rounded-md text-white"
            >
              <IoIosCloseCircle
                className="hover:scale-125  cursor-pointer transition duration-200"
                size={22}
                onClick={() => removeCart(product)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col gap-2 w-[70%] 2xl:w-[80%] py-2 h-full justify-between font-semibold text-primaryText">
        <Link onClick={hideCart} passHref href={`/product/${product?.slug}`}>
          <h2 className="text-sx cursor-pointer hover:text-main transition duration-150">
            {product?.name?.length >= 35
              ? product?.name?.slice(0, 30) + ".."
              : product.name}
          </h2>
        </Link>
        <div className="flex gap-2 w-full justify-between items-center">
          <div className="flex gap-2 items-center">
            <h2 className="text-sx font-semibold text-primaryText">
              unit price:
            </h2>
            <h2 className="text-sx font-semibold text-primaryText line-through">
              ${product?.originalPrice?.toFixed(2)}
            </h2>
          </div>
          <h2 className="text-sx font-bold text-primaryText">
            x{product?.quantity}
          </h2>
        </div>
        <div className="w-full flex justify-between items-center">
          <ButtonIncreament
            handleInc={handleInc}
            handleDec={handleDec}
            variant="small"
            valueProp={product?.quantity}
          />
          <h2 className="text-base font-semibold text-primaryText">
            ${product?.discount_price?.toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default memo(Product);
