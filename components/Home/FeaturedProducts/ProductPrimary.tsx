import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

import type { ProductCardProps } from "@types";

function ProductPrimary({
  imageURI,
  name,
  selling_price,
  short_description,
  slug,
  discount_price,
}: ProductCardProps): JSX.Element {
  return (
    <div className="w-full h-[110%] sm:h-[150%] rounded-xl bg-gradient-to-tr from-main to-mainSecondary flex flex-col justify-center relative px-10">
      <div className="w-[80%] h-[80%] scale-110 hover:scale-125 duration-500 transition relative">
        <Link passHref href={`/product/${slug}`}>
          <Image
            src={imageURI}
            alt="featured-image-1"
            className="object-contain sm:p-20"
            fill
            unoptimized
          />
        </Link>
      </div>

      <div className="w-full flex absolute bottom-5 justify-between pr-20 ">
        <div className="flex flex-col">
          <h2 className=" text-white/80 font-primary font-semibold text-sm">
            {name}
          </h2>
          <h2 className=" text-white font-primary text-base">
            {short_description?.length > 50
              ? short_description?.slice(0, 50) + ".."
              : short_description}
          </h2>
        </div>
        <div className="flex flex-col text-center">
          <h2 className="text-base font-primary font-semibold text-white line-through">
            ${parseFloat(selling_price)?.toFixed(2)}
          </h2>
          <h2 className="text-tiny font-primary font-semibold text-white">
            ${parseFloat(discount_price)?.toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductPrimary);
