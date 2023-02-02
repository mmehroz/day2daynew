import { memo, useContext, Fragment } from "react";
import { CartContext } from "@context";

import Product from "./Product";

function Order(): JSX.Element {
  const { product } = useContext(CartContext);

  function renderProducts() {
    return product?.map((el, i) => (
      <Fragment key={i}>
        <Product {...el} />
        <div className="border-b border-primaryText/40 w-full h-1" />
      </Fragment>
    ));
  }

  function renderTotal(): number {
    let total: number = 0;

    product?.forEach((el, i) => {
      total += el?.discount_price;
    });

    return total;
  }

  return (
    <div className="w-full flex h-full flex-col gap-4 mt-10">
      <div className="w-full h-14 bg-gray-200 rounded-lg flex items-center px-6">
        <h2 className="font-bold text-primaryText/60 font-primary text-base">
          Products
        </h2>
      </div>
      <div className="flex w-full flex-col gap-4">
        {renderProducts()}
        <div className="w-full flex justify-between py-1 itmes-center px-4">
          <h2 className="font-primary font-semibold text-primaryText">
            Subtotal
          </h2>
          <h2 className="text-primaryText/80 font-semibold font-primary">
            {" "}
            ${renderTotal()?.toFixed(2)}
          </h2>
        </div>
        <div className="border-b  border-primaryText/40 w-full h-1" />
        <div className="w-full flex justify-between py-1  itmes-center px-4">
          <h2 className="font-primary font-semibold text-primaryText">
            Shipping
          </h2>
          <h2 className="text-primaryText/80 font-semibold font-primary">
            {" "}
            Free
          </h2>
        </div>
        <div className="border-b  border-primaryText/40 w-full h-1" />
        <div className="w-full flex justify-between itmes-center px-4 py-1">
          <h2 className="font-primary font-semibold text-primaryText">Total</h2>
          <h2 className="text-primaryText/80 font-semibold font-primary">
            {" "}
            ${renderTotal()?.toFixed(2)}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default memo(Order);
