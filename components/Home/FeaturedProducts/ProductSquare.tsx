import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCardProps } from "@types";

function ProductSquare({
  imageURI,
  name,
  short_description,
  discount_price,
  selling_price,
  slug,
}: ProductCardProps): JSX.Element {
  return (
    <div className="w-full h-96 bg-backgroundColorSecondary rounded-xl flex col items-center justify-center relative">
      <div className="w-full h-[80%] relative mb-20 hover:scale-105 duration-300 transition">
        <Link passHref href={`/product/${slug}`} >
          <Image
            src={imageURI}
            alt="featured-image-2"
            fill
            className="object-contain p-8"
            unoptimized
          />
        </Link>
      </div>
      <div className="w-full flex justify-between absolute bottom-4 left-5 pr-10">
        <div className="flex flex-col">
          <h2 className="text-secondaryTextColor/80 font-primary font-semibold text-base">
            {name}
          </h2>
          <h2 className="text-secondaryTextColor/80 font-primary text-xs">
            {short_description?.length > 20
              ? short_description?.slice(0, 20)
              : short_description}
          </h2>
        </div>
        <div className="flex flex-col">
          <h2 className="text-base font-primary font-semibold text-mainSecondary line-through">
            ${parseFloat(selling_price?.toString()).toFixed(2)}
          </h2>
          <h2 className="text-tiny font-primary font-semibold text-mainSecondary">
            ${parseFloat(discount_price?.toString()).toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductSquare);
