import { memo, useState, useContext } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { MdOutlineManageAccounts } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { MdOutlineFeedback } from "react-icons/md";
import { RiVipCrownLine } from "react-icons/ri";
import { UserContext } from "@context";
import { logoutUser } from "@firebase";
import { useRouter } from "next/router";

function User(): JSX.Element {
  const router = useRouter();
  const [hover, setHover] = useState<boolean>(false);

  const { clearUser, user } = useContext(UserContext);

  const handleLogout = async () => {
    await logoutUser();
    clearUser();
    router.reload();
  };

  return (
    <Link passHref href="/account">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-main to-mainSecondary text-white relative"
      >
        <FaUser size={15} />

        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{
                y: "-10%",
                opacity: 0,
              }}
              animate={{
                y: "0%",
                opacity: 1,
              }}
              exit={{
                y: "-10%",
                opacity: 0,
              }}
              className="w-52 mr-10 h-80 rounded-md bg-white shadow-lg absolute top-16 z-[99999] flex flex-col pt-4 px-2 gap-2"
            >
              <div className="w-full flex gap-2 mb-4 border-b pb-4 p-2 px-2  text-sx font-primary font-semibold text-primaryText items-center">
                <RiVipCrownLine size={18} className="text-primaryText" />
                <h2>{user?.name}</h2>
              </div>
              <Link passHref href="/account/orders">
                <div className="user-hover-tab">
                  <AiOutlineShoppingCart />
                  <h2>Orders</h2>
                </div>
              </Link>
              <Link passHref href="/account/account-details">
                <div className="user-hover-tab">
                  <MdOutlineManageAccounts />
                  <h2>Account Details</h2>
                </div>
              </Link>

              <Link passHref href="/account/change-password">
                <div className="user-hover-tab">
                  <CgPassword />
                  <h2>Password</h2>
                </div>
              </Link>

              <Link passHref href="/">
                <div onClick={handleLogout} className="user-hover-tab">
                  <TbLogout />
                  <h2>Logout</h2>
                </div>
              </Link>
              <div className="user-hover-tab">
                <MdOutlineFeedback />
                <h2>Feedback</h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}

export default memo(User);
