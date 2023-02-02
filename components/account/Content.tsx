import { memo, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useLazyQuery } from "@apollo/client";
import { queries } from "@queries";
import { UserContext } from "@context";
import Orders from "./Orders";
import AccountDetails from "./AccountDetails";
import ChangePassword from "./ChangePassword";

function Content() {
  const router = useRouter();

  //@contexts
  const { user } = useContext(UserContext);

  const [type, setType] = useState<string>("");

  useEffect(() => {
    // console.log("router query: ", router?.query);
    setType(router?.query?.account?.toString());
  }, [router?.query]);

  function render() {
    if (type === "orders") {
      return <Orders email={user?.email} />;
    }

    if (type === "account-details") {
      return <AccountDetails email={user?.email} />;
    }

    if (type === "change-password") {
      return <ChangePassword email={user?.email} />;
    }
  }

  return (
    <div className="w-full sm:w-[75%] flex flex-col sm:px-10 gap-10 sm:pb-0 pb-20">
      <h2 className="text-md font-primary font-bold text-primaryText/80">
        {type?.toUpperCase()?.split("-")?.join(" ")}
      </h2>
      {type ? null : (
        <h2 className="text-base font-primary font-semibold text-primaryText/80">
          from your account dashboard you can view your recent orders, manage
          your account details and change your password.
        </h2>
      )}
      <AnimatePresence>{render()}</AnimatePresence>
    </div>
  );
}

export default memo(Content);
