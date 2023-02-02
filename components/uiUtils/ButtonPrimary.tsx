//@ts-nocheck
import { memo, useState } from "react";
import { CircleSpinner } from "react-spinners-kit";
import { motion } from "framer-motion";

import type { ButtonPrimary } from "@types";

function ButtonPrimary({
  title,
  icon,
  loading,
  Icon,
  varaint,

  ...props
}: ButtonPrimary): JSX.Element {
  const [key, setKey] = useState(0);

  return (
    <motion.button
      {...props}
      initial={{
        translateY: 5,
      }}
      animate={{
        translateY: 0,
      }}
      key={key}
      onClick={() => {
        setKey((prev) => prev + 1);
        props?.onClick && props?.onClick();
      }}
      className={`w-44 h-12 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center rounded-md  ${
        varaint === "secondary"
          ? " bg-gradient-to-r to-gray-400/50 from-gray-400 hover:shadow-black/20 transition duration-100"
          : `${
              varaint === "white"
                ? "bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-md transition duration-200 text-black"
                : "bg-gradient-to-r to-mainSecondary from-main hover:shadow-main/40 transition duration-100"
            }`
      }  text-sx font-primary font-semibold hover:shadow-lg  select-none`}
    >
      {loading ? (
        <CircleSpinner size={20} />
      ) : icon ? (
        <div className="flex gap-2 items-center justify-between w-[80%] flex-row-reverse">
          <Icon size={22} />
          <span>{title}</span>
        </div>
      ) : (
        <span>{title}</span>
      )}
    </motion.button>
  );
}

export default memo(ButtonPrimary);
