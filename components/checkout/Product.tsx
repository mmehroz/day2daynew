import { memo } from "react";
import Image from "next/image";

import { ProductAddToCart } from "@types";

function Product({
  imageURI,
  name,
  discount_price,
  quantity,
  sku
}: ProductAddToCart) {
  return (
    <div className="flex w-full gap-4 px-4 ">
      <div className="w-24 h-full rounded-md relative bg-white">
        <Image
          src={imageURI}
          alt="product-image"
          fill
          className="object-cover rounded-md"
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-2 py-2">
        <h2 className="text-sx font-semibold font-primary text-primaryText">
          {name}
        </h2>
        <div className="flex gap-2">
          <h2 className="text-sx font-semibold font-primary text-primaryText">
            x{quantity}
          </h2>
        </div>
        <h2 className="text-base font-semibold font-primary text-primaryText">
          ${discount_price?.toFixed(2)}
        </h2>
        <h2 className="text-sx font-semibold font-primary text-primaryText">
          {sku}
        </h2>
      </div>
    </div>
  );
}

export default memo(Product);
