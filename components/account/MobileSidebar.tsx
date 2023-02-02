import { memo, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineManageAccounts } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { UiConext, UserContext } from "@context";
import { logoutUser } from "@firebase";
import { useRouter } from "next/router";

function MobileAccountSidebar() {
  const router = useRouter();
  const { mobileAccountState, hideMobileAccount } = useContext(UiConext);
  const { clearUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      hideMobileAccount();
      await logoutUser();
      clearUser();
      router.push("/");
    } catch (err) {}
  };

  return (
    <AnimatePresence>
      {mobileAccountState && (
        <motion.div
          initial={{
            opacity: 0,
            y: "100%",
          }}
          animate={{
            opacity: 1,
            y: "0%",
          }}
          exit={{
            y: "100%",
            opacity: 0,
          }}
          transition={{
            type: "keyframes",
          }}
          className="w-full h-[25rem] bottom-0 rounded-t-[20px] absolute flex sm:hidden z-10 py-10 bg-gradient-to-r from-mainSecondary to-main flex-col px-4 gap-4"
        >
          <Link onClick={hideMobileAccount} passHref href="/account/orders">
            <div className="rounded-md w-full bg-white h-14 text-sx font-primary text-primaryText/80 flex items-center px-6 gap-2 font-bold">
              <AiOutlineShoppingCart size={22} />
              <h2>Orders</h2>
            </div>
          </Link>
          <Link
            onClick={hideMobileAccount}
            passHref
            href="/account/account-details"
          >
            <div className="rounded-md w-full bg-white h-14 text-sx font-primary text-primaryText/80 flex items-center px-6 gap-2 font-bold">
              <MdOutlineManageAccounts size={22} />
              <h2>Account Details</h2>
            </div>
          </Link>
          <Link
            onClick={hideMobileAccount}
            passHref
            href="/account/change-password"
          >
            <div className="rounded-md w-full bg-white h-14 text-sx font-primary text-primaryText/80 flex items-center px-6 gap-2 font-bold">
              <CgPassword size={22} />
              <h2>Change Password</h2>
            </div>
          </Link>
          <div
            onClick={handleLogout}
            className="rounded-md w-full bg-white h-14 text-sx font-primary text-primaryText/80 flex items-center px-6 gap-2 font-bold"
          >
            <TbLogout size={22} />
            <h2>Logout</h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(MobileAccountSidebar);
