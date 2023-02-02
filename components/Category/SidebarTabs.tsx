//@ts-nocheck
import { memo, useState, useEffect } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

import type { SidebarTabsProps } from "@types";
import { useRouter } from "next/router";

function SidebarTabs({
  children,
  title,
  hide,
  ...props
}: SidebarTabsProps): JSX.Element {
  const [collapse, setCollapse] = useState<boolean>(false);

  if (hide) {
    return <></>;
  }

  return (
    <div {...props} className="w-full flex flex-col">
      <div
        onClick={() => setCollapse(!collapse)}
        id="parenthover"
        className="w-full flex justify-between items-center cursor-pointer"
      >
        <h2
          id="childeffect"
          className="text-sx font-semibold text-primaryText uppercase"
        >
          {title}
        </h2>
        <MdOutlineArrowForwardIos
          id="childeffect"
          className={`text-xs ${collapse && "rotate-90"} `}
        />
      </div>
      <AnimatePresence>
        {collapse && (
          <motion.div
            initial={{
              y: "50%",
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
            transition={{
              type: "keyframes",
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(SidebarTabs);
