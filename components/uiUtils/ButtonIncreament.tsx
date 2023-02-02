import { memo, useState } from "react";
import { motion } from "framer-motion";

import { FiPlus } from "react-icons/fi";
import { AiOutlineMinus } from "react-icons/ai";

function ButtonIncreament({
  variant,
  color,
  valueProp,
  handleInc,
  handleDec,
  totalQuantity,
  width,
}: {
  variant?: "small" | "normal" | "large";
  color?: "main" | "secondary";
  valueProp?: number;
  totalQuantity?: number;
  handleInc?: () => void;
  handleDec?: () => void;
  width?: string;
}) {
  const [value, setValue] = useState(valueProp || 1);

  const handleClicks = (type: "inc" | "dec") => () => {
    if (type === "inc" && value === totalQuantity) return;
    if (type === "inc") {
      handleInc();
    }

    if (type === "dec") {
      handleDec();
    }

    setValue((prev) => {
      if (prev === 1 && type === "dec") return 1;
      return type === "inc" ? prev + 1 : prev - 1;
    });
  };

  const renderWidth = (): string => {
    if (width) {
      return width;
    }

    return variant === "small" ? "50%" : variant === "large" ? "100%" : "30%";
  };

  return (
    <div
      style={{
        width: renderWidth(),
        height: variant === "small" ? "2.5rem" : "3rem",
      }}
      className={`bg-gradient-to-r ${
        color === "main"
          ? "to-main from-mainSecondary"
          : "to-mainSecondary from-main"
      }  rounded-lg h-12 flex text-white z-10`}
    >
      <div
        onClick={handleClicks("dec")}
        className="w-[25%] flex items-center justify-center h-full hover:bg-white/20 rounded-r-xl duration-200 transition"
      >
        <AiOutlineMinus size={20} />
      </div>
      <motion.div
        initial={{
          opacity: 0,
          scale: "50%",
        }}
        animate={{
          opacity: 1,
          scale: "100%",
        }}
        key={value}
        className="w-[50%] font-primary font-semibold text-base flex items-center justify-center h-full  "
      >
        <h2 className="select-none">{value}</h2>
      </motion.div>
      <motion.div
        animate={{
          opacity: 1,
          scale: "100%",
        }}
        initial={{
          opacity: 0,
          scale: "50%",
        }}
        onClick={handleClicks("inc")}
        className="w-[25%] -z-[1] h-full flex items-center justify-center hover:bg-white/20 rounded-l-xl duration-200 transition"
      >
        <FiPlus size={20} />
      </motion.div>
    </div>
  );
}

export default memo(ButtonIncreament);
