import { memo, useContext } from "react";
import Link from "next/link";

import { HiMenuAlt1, HiOutlineLogin } from "react-icons/hi";
import { BiHomeSmile, BiSearchAlt } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { TbUser } from "react-icons/tb";

import { CartContext, UiConext, UserContext } from "@context";

function MobileMenu(): JSX.Element {
  const { showCart, product } = useContext(CartContext);
  const { showSearch, showLogin, toggleMobileAccount, toggleMobileCategory } =
    useContext(UiConext);
  const { user } = useContext(UserContext);

  return (
    <div className="w-full  h-16  bg-gradient-to-r to-main from-mainSecondary shadow-md shadow-black flex items-center justify-between fixed sm:hidden bottom-0 z-[99999] px-8 text-md text-white">
      <HiMenuAlt1 onClick={toggleMobileCategory} />
      <Link passHref href="/">
        <BiHomeSmile />
      </Link>
      <BiSearchAlt onClick={showSearch} />

      {user?.isExists === true ? (
        <TbUser onClick={toggleMobileAccount} />
      ) : (
        <HiOutlineLogin onClick={showLogin} />
      )}

      <div className="relative">
        {product?.length > 0 ? (
          <>
            <div className="w-6 h-6 bg-white rounded-full -right-2 bottom-3 animate-ping absolute -z-10" />
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center absolute -right-2 bottom-3 -z-10">
              <h2 className="text-[8px] font-bold font-primary text-primaryText">
                {product?.length}
              </h2>
            </div>
          </>
        ) : null}
        <FiShoppingBag onClick={showCart} />
      </div>
    </div>
  );
}

export default memo(MobileMenu);
