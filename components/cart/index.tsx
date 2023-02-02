import { memo, useContext, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import formatNumber from "format-number";

import { IoClose } from "react-icons/io5";
import NotFoundPlaceholder from "../../assets/images/not-found-alt.svg";
import { ButtonPrimary } from "@uiUtils";
import { CartContext, UiConext, UserContext } from "@context";
import CartProduct from "./Product";
import Link from "next/link";

const Cart = (): JSX.Element => {
  const {
    cartState,
    hideCart,
    product: cartProducts,
  } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { showLogin } = useContext(UiConext);

  function render() {
    return cartProducts?.map((el, i) => <CartProduct {...el} key={el?.slug} />);
  }

  function Total(): JSX.Element {
    let total: number = 0;

    cartProducts?.forEach((el, i) => {
      total += el.discount_price;
    });

    return (
      <div className="flex items-center">
        <h2>${formatNumber()(total)}</h2>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {cartState && (
        <motion.div
          initial={{
            x: "100%",
            opacity: 0,
          }}
          animate={{
            x: "0%",
            opacity: 1,
          }}
          exit={{
            x: "100%",
            opacity: 0,
          }}
          transition={{
            type: "keyframes",
          }}
          id="product-popup"
          className="w-[100%] md:w-[32%]  2xl:w-[25%] right-0 h-full bg-backgroundColorSecondary z-[9999999999] absolute font-primary flex flex-col gap-4"
        >
          <div className="w-full flex justify-between items-center p-6 mt-2">
            <h2 className="text-md text-primaryText font-bold font-primary">
              Shopping cart
            </h2>
            <IoClose
              onClick={hideCart}
              className="cursor-pointer hover:scale-125 hover:text-mainSecondary duration-200 transition"
              size={22}
            />
          </div>
          <div className="border-b border-primaryText" />
          <div className="flex flex-col w-full h-full items-center justify-between gap-4">
            {cartProducts?.length === 0 ? (
              <>
                <div className="flex flex-col gap-4 mt-10">
                  <div className="w-[10rem] h-[20rem] relative">
                    <Image
                      src={NotFoundPlaceholder}
                      alt="empty-shopping-cart"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h2 className="font-bold font-primary text-primaryText text-base">
                    Your cart is empty
                  </h2>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-6 w-full flex-col h-[90%] sm:h-[75%] 2xl:h-[90%] overflow-y-scroll px-4 pb-10">
                  {render()}
                </div>
              </>
            )}
          </div>
          <div className="mb-6 w-full px-4 absolute -bottom-4 z-[9999999]">
            {user?.isExists ? (
              <Link onClick={hideCart} passHref href="/checkout">
                <ButtonPrimary
                  style={{
                    width: "100%",
                    color: "white",
                  }}
                  Icon={Total}
                  title="Checkou"
                  icon
                />
              </Link>
            ) : (
              <ButtonPrimary
                style={{
                  width: "100%",
                  color: "white",
                  justifyContent: "start",
                  paddingLeft: "20px",
                }}
                title="Login"
                onClick={() => {
                  showLogin();
                  hideCart();
                }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Cart);
