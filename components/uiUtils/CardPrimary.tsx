import { useState, useContext } from "react";
import Image from "next/image";
import { memo } from "react";
import { WaveSpinner } from "react-spinners-kit";

import type { ProductCardProps } from "@types";
import { ProductPopupContext } from "@context";
import { useDimensions } from "@hooks";
import { useRouter } from "next/router";

function CardPrimary({
  width,
  imageURI,
  name,
  slug,
  discount_price,
  selling_price,
  short_description,
}: ProductCardProps): JSX.Element {
  const router = useRouter();

  const [imageLoaded, setImageLoaded] = useState(false);
  const { dispatchPopup, fetchProductDetails } =
    useContext(ProductPopupContext);
  const [dimension] = useDimensions();

  function handleClick(): void {
    if (dimension?.width <= 600) {
      router?.push(`/product/${slug}`);
      return;
    }
    fetchProductDetails(slug);
    dispatchPopup();
  }

  return (
    <div
      onClick={handleClick}
      style={{
        width,
      }}
      className="card-secondary  3xl:w-72 gap-6 mb-2 pb-2"
    >
      <div className="h-[75%] bg-white w-full  rounded-xl relative cursor-pointer ">
        <Image
          src={imageURI}
          alt="product-image"
          className="object-contain hover:scale-105 duration-300 transition"
          fill
          sizes="(max-width: 50rem) 50rem,
          (max-width: 50rem) 50rem,
          50rem"
          onLoadingComplete={() => setImageLoaded(true)}
          unoptimized
        />

        {imageLoaded === false && (
          <div className="w-full absolute bg-white flex h-full items-center justify-center">
            <WaveSpinner color="#d1d5db" />
          </div>
        )}
      </div>
      <div className="w-full flex flex-col items-start px-2">
        <h2 className="text-primaryText/90 font-primary font-semibold">
          {name?.length >= 18 ? name?.slice(0, 18) + ".." : name}
        </h2>
        <h2 className="text-primaryText/90 font-primary text-xs">
          {short_description?.length >= 26
            ? short_description?.slice(0, 26) + ".."
            : short_description}
          {short_description?.length > 0 ? null : (
            <span className="unvisible">
              Lorem ipsum dolor sit amet consectetur
            </span>
          )}
        </h2>
        <div className="w-full flex items-start mt-2 gap-2 mb-2">
          <h2 className="font-semibold font-primary text-base text-red-500">
            $
            {parseFloat(discount_price?.toString()).toFixed(2)}
          </h2>
          <h2 className="font- line-through font-primary text-base text-red-500/80">
            $
            {parseFloat(selling_price?.toString()).toFixed(2)}

          </h2>
        </div>
      </div>
    </div>
  );
}

export default memo(CardPrimary);
