import { memo, useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import Image from "next/image";

import { sliderSettingsBannerOne } from "@uiUtils";
import { useQuery } from "@apollo/client";
import { queries } from "@queries";

function SliderSecondary({ type }: { type: string }): JSX.Element {
  const { data, loading } = useQuery(queries.sliderImages, {
    initialFetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
    variables: {
      type: type,
    },
  });

  const [images, setImages] = useState<Array<string>>([]);

  const memoizeImages = useMemo(() => images, [images]);
  const memoizeRender = useMemo(() => render(), [memoizeImages, loading]);

  useEffect(() => {
    setImages(data?.sliderImages?.images);
  }, [data]);

  function render() {
    const loadingArr = new Array(20).fill(null);

    if (loading) {
      return (
        <Slider {...sliderSettingsBannerOne}>
          {loadingArr?.map((el, i) => (
            <div key={i} data-index={i}>
              <div className="h-[13rem] sm:h-[20rem] w-full">
                <div className="w-full h-full bg-gray-300 animate-pulse rounded-xl" />
              </div>
            </div>
          ))}
        </Slider>
      );
    }

    if (memoizeImages?.length > 0) {
      return (
        <Slider {...sliderSettingsBannerOne}>
          {memoizeImages?.map((el, i) => (
            <div key={i}>
              <div className="h-[13rem] sm:h-[20rem] w-full">
                <Image
                  className="h-full w-full object-cover rounded-xl"
                  alt="Banner-3"
                  width={320}
                  quality={100}
                  height={320}
                  src={el}
                  unoptimized
                />
              </div>
            </div>
          ))}
        </Slider>
      );
    }
  }

  return memoizeRender;
}

export default memo(SliderSecondary);
