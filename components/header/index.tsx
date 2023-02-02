import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
  startTransition,
} from "react";
import { FiSearch } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineLogin } from "react-icons/hi";
import { useQuery } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";

import Tab from "./HeaderTabs";

import { queries } from "@queries";
import { Logo } from "@uiUtils";
import type { CategoriesProps } from "@types";
import { CartContext, UiConext, UserContext } from "@context";
import User from "./User";
import { useRouter } from "next/router";

const Header = (): JSX.Element => {
  const { showCart, product } = useContext(CartContext);
  const { show, showSearch, showLogin, headerState } = useContext(UiConext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const { data, loading, error } = useQuery(queries.headerCategories, {
    initialFetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });

  const [categories, setCategories] = useState<Array<CategoriesProps>>([]);
  const [cartLength, setCartLength] = useState<number>(0);
  const [pageLoading, setPageLoading] = useState(false);

  //memoizezation
  const memoizeCategories = useMemo(() => categories, [categories]);
  const memoizeRenderCategories = useMemo(
    () => renderCategories(),
    [memoizeCategories, loading]
  );

  useEffect(() => {
    startTransition(() => {
      setCategories(data?.categoriesHeader);
    });
  }, [data]);

  useEffect(() => {
    const handleStart = (url) => url !== router?.asPath && setPageLoading(true);
    const handleComplete = (url) =>
      url === router?.asPath && setPageLoading(false);

    router?.events.on("routeChangeStart", handleStart);
    router?.events.on("routeChangeComplete", handleComplete);
    router?.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router?.asPath]);

  useEffect(() => {
    setCartLength(product?.length);
  }, [product, show]);

  function renderCategories() {
    const arr = new Array(5).fill(null);

    if (loading) {
      return arr?.map((el, i) => (
        <div
          key={i}
          className="w-24 h-6 rounded-xl bg-gray-300 animate-pulse"
        />
      ));
    }

    return memoizeCategories?.map((el, i) => (
      <Tab key={i} title={el?.name} slug={el?.slug} />
    ));
  }

  if (headerState) {
    return <></>;
  }

  // console.log(router);
  // console.log("router")

  if (
    router?.asPath === "/register" ||
    router?.asPath?.includes("/verify") ||
    router?.asPath?.includes("thankyou") ||
    router?.pathname === "/order/[order]"
  ) {
    return <></>;
  }

  return (
    <React.Fragment>
      <nav className="bg-[#f4f4f5] pt-0 pb-2 fixed z-[99] shadow-md font-primary">
        <div className="w-full items-center justify-center flex h-6 sm:h-10 bg-gradient-to-tr to-main from-mainSecondary text-white font-primary  text-xs md:text-sx font-semibold mb-4">
          <h2 className="hidden sm:flex text-[16px] font-medium ">
            WARNING! Some products contains nicotine. Nicotine is an addictive
            chemical
          </h2>
          <h2 className="flex sm:hidden">
            WARNING! Some products contains nicotine.
          </h2>
        </div>
        <div className="items-center w-screen px-2 sm:px-6 lg:px-8 lg:pr-10">
          <div className="relative flex h-8 md:h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:mb-0 mb-2 sm:items-stretch sm:justify-start">
              <Logo />
              <div className="hidden sm:ml-11 sm:block text-base items-center ">
                <div className="flex space-x-4 ml-2  font-primary text-primaryText/90 items-center py-3 gap-4 ">
                  {memoizeRenderCategories}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 sm:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-5 hidden">
              <FiSearch
                onClick={showSearch}
                size={24}
                className="text-primaryText hover:scale-125 cursor-pointer transition duration-200 hover:text-mainSecondary "
              />
              {user?.name ? (
                <User />
              ) : (
                <HiOutlineLogin
                  onClick={showLogin}
                  size={26}
                  className="text-primaryText hover:scale-110 hover:text-mainSecondary cursor-pointer duration-200 transition"
                />
              )}
              <div className="relative">
                <FiShoppingBag
                  onClick={showCart}
                  size={24}
                  className="text-primaryText/80 z-10 cursor-pointer hover:text-mainSecondary duration-200 transition hover:scale-110"
                />
                <div className="absolute w-5 h-5 rounded-full bg-gradient-to-tr to-main from-mainSecondary -top-2 -right-2 items-center justify-center flex">
                  {cartLength ? (
                    <div className="absolute w-5 h-5  -z-10 animate-ping rounded-full bg-gradient-to-tr to-main from-mainSecondary  "></div>
                  ) : (
                    <></>
                  )}

                  <h2 className="text-[10px] font-semibold text-white">
                    {cartLength <= 100 && cartLength}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {pageLoading && (
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: "0%",
              opacity: 1,
            }}
            exit={{
              y: "200%",
              opacity: 0,
            }}
            className="w-10 h-10 rounded-lg bg-gradient-to-tr from-main to-mainSecondary absolute z-[99999] bottom-10 right-10 flex items-center justify-center"
          >
            <div className="w-4 h-4 p-[6px] rounded-full border-white border-4 flex items-center justify-center relative">
              <div className="w-4 h-4 p-[6px] rounded-full border-white border-4 flex items-center justify-center absolute animate-loader"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Header;
