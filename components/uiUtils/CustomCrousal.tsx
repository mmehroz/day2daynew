import { memo, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import type { CustomCrousalProps } from "@types";

function CustomCrousal({
  children,
  hideBtns,
}: CustomCrousalProps): JSX.Element {
  const [totalScrolled, setTotalScrolled] = useState<number>(0);

  const handleScrollLeft = () => {
    const el = document.getElementById("gallery-images");
    let scrollAmount = totalScrolled;
    const sliderTimer = setInterval(() => {
      if (el) el.scrollLeft -= 12;
      scrollAmount -= 12;
      if (scrollAmount <= 0) {
        clearInterval(sliderTimer);
      }
    }, 15);

    setTotalScrolled(0);
    return true;
  };

  const handleScrollRight = () => {
    const el = document.getElementById("gallery-images");
    let scrollAmount = 0;
    const sliderTimer = setInterval(() => {
      if (el) el.scrollLeft += 10;
      scrollAmount += 10;
      if (scrollAmount >= 150) {
        setTotalScrolled(totalScrolled + scrollAmount);

        clearInterval(sliderTimer);
      }
    }, 15);

    return true;
  };


  return (
    <div className="w-full  flex items-center justify-between">
      {hideBtns && (
        <div className="w-12 h-12 hidden sm:flex hover:scale-110 duration-200 transition items-center justify-center rounded-full bg-gradient-to-tr from-mainSecondary to-main">
          <MdOutlineKeyboardArrowDown
            size={28}
            className="rotate-90 text-white cursor-pointer"
            onClick={handleScrollLeft}
          />
        </div>
      )}
      <div
        id="gallery-images"
        className=" w-full sm:w-[80%] h-24 overflow-x-scroll hidescrollbar gap-4 flex flex-row  pb-1 "
      >
        {children}
      </div>
      {hideBtns && (
        <div className="w-12 h-12 hover:scale-110 duration-200 transition hidden sm:flex items-center justify-center rounded-full bg-gradient-to-tr from-mainSecondary to-main">
          <MdOutlineKeyboardArrowDown
            size={28}
            className="-rotate-90 text-white cursor-pointer "
            onClick={handleScrollRight}
          />
        </div>
      )}
    </div>
  );
}

export default memo(CustomCrousal);
