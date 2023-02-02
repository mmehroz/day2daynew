import { memo, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { BsCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

import { UiConext } from "@context";

function Modal(): JSX.Element {
  const { show, message, modalType } = useContext(UiConext);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            x: "-100%",
          }}
          animate={{
            opacity: 1,
            x: "0%",
          }}
          exit={{
            opacity: 0,
            x: "-100%",
          }}
          className={`w-[20rem] h-16 shadow-xl shadow-black/40 rounded-md left-10 absolute bg-gradient-to-tr ${
            modalType === "success"
              ? "to-primaryText from-black"
              : "to-red-500 from-red-700"
          }  z-[999999999999999999] bottom-4 text-white items-center justify-between px-4 flex`}
        >
          <h2 className="text-sx font-semibold font-primary">{message}</h2>
          <div className="w-6 h-6 rounded-full  bg-gradient-to-tr to-gray-100 from-white flex items-center justify-center relative">
            <div className="w-full h-full rounded-full bg-white animate-ping absolute"></div>
            {modalType === "success" ? (
              <BsCheck size={20} className=" text-green-500" />
            ) : (
              <IoClose size={20} className=" text-red-500" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(Modal);
