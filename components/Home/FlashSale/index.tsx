import { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import {
  CardPrimary,
  sliderSettingsSecndary,
  LoadingCardPrimary,
} from "@uiUtils";
import { useQuery } from "@apollo/client";
import { queries } from "@queries";

import type { ProductCardProps } from "@types";

export default function FlashSale(): JSX.Element {
  const { data, loading, error } = useQuery(queries.flashSale, {
    initialFetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });

  //@states
  const [products, setProducts] = useState<Array<ProductCardProps>>([]);

  //@memoizetion
  const memoizeProducts = useMemo(() => products, [products]);
  const memoizeRenderProducts = useMemo(
    () => renderProducts(),
    [memoizeProducts, loading]
  );

  useEffect(() => {
    // console.log(data);
    // console.log("flashsale");
    if (!data?.flashSale.length) return;

    setProducts(data?.flashSale);
  }, [data]);

  // console.log("products: ", products);

  function renderProducts() {
    const loadingArr = new Array(20).fill(null);

    if (loading) {
      return (
        <Slider {...sliderSettingsSecndary}>
          {loadingArr?.map((el, i) => (
            <div key={i}>
              <LoadingCardPrimary />
            </div>
          ))}
        </Slider>
      );
    }

    if (products?.length > 0) {
      return (
        <Slider {...sliderSettingsSecndary}>
          {products?.map((el, i) => (
            <div data-index={i} key={i}>
              <CardPrimary
                imageURI={el?.imageURI}
                name={el?.name}
                short_description={el?.short_description}
                selling_price={el?.selling_price}
                discount_price={el?.discount_price}
                slug={el?.slug}
                key={i}
              />
            </div>
          ))}
        </Slider>
      );
    }
  }

  return (
    <div className="w-full h-full flex flex-col sm:mt-40 gap-10 2xl:mt-10">
      <h2 className="font-semibold text-primaryText/95 text-2xl font-primary">
        Flash Sale
      </h2>
      {memoizeRenderProducts}
    </div>
  );
}
