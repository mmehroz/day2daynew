import { memo, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const DynamicDropDownHeader = dynamic(
  () => import("../uiUtils/DropdownHeader")
);

import type { HeaderTabs } from "@types";

function HeaderTabs({ title, slug }: HeaderTabs): JSX.Element {
  const [active, setActive] = useState(false);

  return (
    <Link href={`/category/${slug}`} passHref>
      <div
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className="flex items-center cursor-pointer headerTabParent py-10 relative"
      >
        <h2>{title}</h2>
        {active && (
          <motion.div
            initial={{
              opacity: 0,
              width: "0%",
            }}
            animate={{
              opacity: 1,
              width: "100%",
            }}
            transition={{
              type: "keyframes",
            }}
            className="w-full absolute flex h-[4px]   bg-gradient-to-tr to-mainSecondary from-main
             top-20 rounded-xl"
          />
        )}
        <MdOutlineKeyboardArrowDown
          size={20}
          className="text-primaryText/40 headerTabIcon"
        />
        <AnimatePresence>
          {active && (
            <motion.div
              onMouseEnter={() => setActive(true)}
              initial={{
                opacity: 0,
                y: "10%",
              }}
              animate={{
                opacity: 1,
                y: "0%",
              }}
              exit={{
                opacity: 0,
                y: "10%",
              }}
              transition={{}}
              className="absolute h-96 rounded-md bg-backgroundColorSecondary shadow-md w-60 top-[100px] duration-150  "
            >
              <div className="w-full flex flex-col overflow-y-scroll overflow-x-hidden h-full " >

              {active && <DynamicDropDownHeader parent={slug} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}

export default memo(HeaderTabs);
