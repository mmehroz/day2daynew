import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { mainSliderSettings } from "@uiUtils";
import Slider from "react-slick";
import { useQuery } from "@apollo/client";
import { queries } from "@queries";

export default function SliderComp(): JSX.Element {
  const { data, loading } = useQuery(queries.sliderImages, {
    initialFetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
    variables: {
      type: "MAIN"
    }
  });

  const [images, setImages] = useState<Array<string>>([]);

  const memoizeImages = useMemo(() => images, [images]);
  const memoizeRender = useMemo(() => render(), [memoizeImages, loading]);

  useEffect(() => {
    setImages(data?.sliderImages?.images);
  }, [data]);

  function render ()  {
    const loadingArr = new Array(20).fill(null);

    if (loading) {
      return (
        <Slider {...mainSliderSettings}>
          {loadingArr?.map((el, i) => (
            <div key={i}>
              <div data-index={i} key={i}>
                <div className=" w-[50rem] h-[30rem] sm:w-[100rem] 2xl:w-[110rem] 3xl:w-[122rem] 2k:w-[100%] sm:h-[100vh] relative">
                  <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      );
    }

    if (memoizeImages?.length > 0) {
      return (
        <Slider {...mainSliderSettings}>
          {memoizeImages?.map((el, i) => (
            <div data-index={i} key={i}>
              <div className="w-[50rem] h-[30rem] sm:w-[100rem] 2xl:w-[110rem] 3xl:w-[122rem] 2k:w-[100%] sm:h-[100vh] relative">
                <Image
                  alt={`image-${i}`}
                  src={
                    el ||
                    "https://portal.day2daywholesale.com/public/assets/img/sliders/1750837329306702.jpg"
                  }
                  fill
                  className="object-contain sm:object-cover"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </Slider>
      );
    }
  };

  return (
    <div className="flex w-[140%] -mb-14 sm:-mb-0 sm:w-[106%] 2xl:w-[110%] 2k:w-[105%] flex-col relative mt-0 sm:mt-[5.1rem] -ml-14 sm:-ml-10">
      {memoizeRender}
    </div>
  );
}
