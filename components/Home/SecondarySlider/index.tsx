import React from "react";

import SliderPrimary from "./SliderPrimary";
import SliderSecondary from "./SliderSecondary";

function Banner(): JSX.Element {
  return (
    <div className="w-full bg-transparent flex flex-col sm:flex-row gap-2 justify-between">
      <div
        id="secondary-slider-image"
        className="flex h-[13rem] sm:h-[20rem] w-full mb-5 sm:mb-0 sm:w-[32%] flex-col cursor-pointer"
      >
        <SliderPrimary />
      </div>
      <div
        id="secondary-slider-image"
        className="flex h-[13rem] sm:h-[20rem] w-full mb-5 sm:w-[32%] flex-col cursor-pointer"
      >
        <SliderSecondary type="THIRD" />
      </div>
      <div
        id="secondary-slider-image"
        className="flex flex-col h-[13rem] sm:h-[20rem] w-full sm:w-[32%] cursor-pointer"
      >
        <SliderSecondary type="FOURTH" />
      </div>
    </div>
  );
}

export default Banner;
