import { memo, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineManageAccounts } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";

import { logoutUser } from "@firebase";
import { UserContext } from "@context";

function Sidebar(): JSX.Element {
  const router = useRouter();
  const { clearUser } = useContext(UserContext);

  const handleLogout = async () => {
    await logoutUser();
    clearUser();
    router?.push("/");
  };

  return (
    <div className="w-[25%] hidden sm:flex flex-col gap-2 border-r border-primaryText/30 px-4">
      <Link passHref href="/account/orders">
        <div
          className={`account-tabs ${
            router?.query?.account === "orders" ? "active-user-hover-tab" : ""
          }`}
        >
          <AiOutlineShoppingCart size={22} />
          <h2>Orders</h2>
        </div>
      </Link>
      <Link passHref href="/account/account-details">
        <div
          className={`account-tabs ${
            router?.query?.account === "account-details"
              ? "active-user-hover-tab"
              : ""
          }`}
        >
          <MdOutlineManageAccounts size={22} />
          <h2>Account Details</h2>
        </div>
      </Link>
      <Link passHref href="/account/change-password">
        <div className="account-tabs">
          <CgPassword size={22} />
          <h2>Change Password</h2>
        </div>
      </Link>
      <div onClick={handleLogout} className="account-tabs">
        <TbLogout size={22} />
        <h2>Logout</h2>
      </div>
    </div>
  );
}

export default memo(Sidebar);
