import { memo, useState, useEffect } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineWaterDrop } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { BsBatteryCharging } from "react-icons/bs";
import { HiLightningBolt } from "react-icons/hi";
import { TbDimensions } from "react-icons/tb";

import type { SelectDropdownProps } from "@types";

function SelectDropdown({
  children,
  title,
  selected,
  type,
  varaint,
}: SelectDropdownProps): JSX.Element {
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    let clicked: boolean = false;

    function setClickedTrue(e: any) {
      clicked = true;
    }

    function handleDropDown(e: any) {
      return;
    }

    document
      .getElementById("variant-dropdown")
      ?.addEventListener("click", setClickedTrue);

    document
      ?.getElementById("dropdown-123")
      ?.addEventListener("click", handleDropDown);

    return () => {
      document
        .getElementById("variant-dropdown")
        ?.removeEventListener("click", setClickedTrue);

      document
        ?.getElementById("dropdown-123")
        ?.removeEventListener("click", handleDropDown);
    };
  }, []);

  const renderIcons = () => {
    if (type === "BATTERIES") {
      return <BsBatteryCharging size={18} className="text-primaryText" />;
    }

    if (type === "CHARGERS") {
      return <HiLightningBolt size={18} className="text-primaryText" />;
    }

    if (type === "SIZES") {
      return <TbDimensions size={18} className="text-primaryText" />;
    }

    if (type === "LIQUIDS") {
      return <MdOutlineWaterDrop size={18} className="text-primaryText" />;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full flex gap-2 items-center">
        <h2 className="font-bold text-primaryText/80 font-primary text-sx">
          {title}
        </h2>
        {renderIcons()}
      </div>
      <div className="flex gap-2 flex-row w-full flex-wrap" >
        {children}
      </div>
    </div>
  );
}

export default memo(SelectDropdown);
