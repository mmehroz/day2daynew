import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { InputLabel as InputLabelTypes } from "@types";

function InputLabel({
  title,
  Icon,
  handleChange,
  error,
  errorMessage,
  backgroundColor,
  disabled,
  padding,
  loading,
  ...props
}: InputLabelTypes): JSX.Element {
  return (
    <>
      <h2 className="font-bold text-primaryText/80 font-primary text-sx">
        {loading ? (
          <div className="w-14 h-4 rounded-md animate-pulse bg-gray-300" />
        ) : (
          title
        )}
      </h2>
      <div
        style={{
          backgroundColor,
          padding,
        }}
        className={`w-[100%] flex items-center ${loading && 'animate-pulse'} bg-white rounded-lg h-8 p-6 border gap-2 px-3 -mt-2 ${
          error && "border-red-500"
        }`}
      >
        <Icon className="text-primaryText/60" size={22} />
        <input
          style={{
            backgroundColor,
          }}
          {...props}
          onChange={handleChange}
          disabled={disabled}
          className="w-[100%] outline-none bg-white font-semibold font-primary text-primaryText text-sx"
        />
      </div>
      <AnimatePresence>
        {errorMessage?.length > 0 ? (
          <motion.h2
            initial={{
              opacity: 0,
              y: "2%",
            }}
            animate={{
              opacity: 1,
              y: "0%",
            }}
            exit={{
              opacity: 0,
              y: "2%",
            }}
            className="font-semibold text-red-500 text-sx font-primary"
          >
            {errorMessage}
          </motion.h2>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default memo(InputLabel);
