import Image from "next/image";
import { ButtonPrimary } from "@uiUtils";
import { motion } from "framer-motion";

import Placeholder from "../../assets/images/vector-5.svg";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@context";
import { useRouter } from "next/router";

export default function Order() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  if (user.isExists === null) {
    return <></>;
  }

  if (user.isExists === false) {
    router.push("/");
    return <></>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full  flex items-center bg-gradient-to-tr bg-orange-500  justify-center flex-col gap-4 relative">
        <motion.div
          initial={{
            scale: "95%",
            opacity: "10%",
          }}
          animate={{ scale: "100%", opacity: "30%" }}
          exit={{
            scale: "-5%",
          }}
          transition={{
            ease: "linear",
            duration: 3,
            repeat: Infinity,
            delay: 0.4,
            type: "tween",
            repeatType: "reverse",
          }}
          className="w-[60rem] h-[60rem] bg-gradient-to-r absolute to-main from-red-500 z-1 rounded-full opacity-20 shadow-lg"
        />
        <motion.div
          initial={{
            scale: "95%",
            opacity: "10%",
          }}
          animate={{ scale: "100%", opacity: "30%" }}
          exit={{
            scale: "-5%",
          }}
          transition={{
            ease: "linear",
            duration: 2,
            repeat: Infinity,
            delay: 0.1,
            type: "tween",
            repeatType: "reverse",
          }}
          className="w-[50rem] h-[50rem] bg-gradient-to-r absolute to-main from-red-500 z-2 rounded-full opacity-20 shadow-lg"
        />
        <div className="w-[40rem] h-[40rem] bg-gradient-to-r absolute to-main/20 from-red-500/20 z-[999] rounded-full opacity-100 shadow-lg flex flex-col items-center justify-center">
          <div className="w-60 h-60 flex items-center justify-center rounded-full bg-white relative">
            <Image
              src={Placeholder}
              alt="placeholder"
              fill
              className="object-contain p-8"
            />
          </div>
          <div className="flex flex-col gap-2 items-center z-[999]">
            <h2 className="font-fashion font-bold text-orange-100 text-[34px]">
              Thank You
            </h2>
            <h2 className="font-semibold font-primary text-base text-orange-200">
              Your order has been placed
            </h2>
            <div className="flex items-center font-semibold font-primary text-base text-orange-200 gap-2 mb-10">
              <h2 className="">You can track your order in your</h2>
              <Link passHref href="/account/orders">
                <h2 className="text-white cursor-pointer">Dashboard</h2>
              </Link>
            </div>
            <Link passHref href="/">
              <ButtonPrimary title="Home" varaint="white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
