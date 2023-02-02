import { memo } from "react";
import Image from "next/image";

function Product({
  purchasedPrice,
  quantity,
  product,
  variants,
}: {
  purchasedPrice: number;
  quantity: number;
  product: {
    sku: string;
    name: string;
    imageURI: string;
    short_description: string;
  };

  variants: Array<{ sku: string }>;
}): JSX.Element {

  function renderSku(): string {
    let sku: string = product?.sku;

    if (variants?.length) {
      variants?.forEach((el) => {
        sku = `${sku}-${el.sku}`;
      });
    }

    return sku;
  }

  return (
    <div className="w-full flex p-4 rounded-lg items-center justify-between  cursor-pointer hover:bg-gray-100 transition duration-100 px-2 pr-6">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-lg relative">
          <Image
            src={product?.imageURI}
            fill
            className="object-contain"
            alt={product?.name}
            unoptimized
          />
        </div>
        <div className="flex flex-col w-96">
          <h2 className="font-primary text-sx font-semibold text-primaryText">
            {product?.name}
          </h2>
          <h2 className="font-bold text-sx font-primary text-primaryText">
            {renderSku()}
          </h2>
        </div>
      </div>
      <div className="flex items-center font-semibold text-primaryText font-primary text-sx">
        <h2>x{quantity}</h2>
      </div>
      <div className="flex flex-col items-center font-bold text-primaryText font-primary text-sx">
        <h2>${purchasedPrice?.toFixed(2)}</h2>
        <h2>${(purchasedPrice * quantity)?.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default memo(Product);
