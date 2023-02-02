import { useEffect, useState, useMemo } from "react";
import { useLazyQuery } from "@apollo/client";
import ProductPrimary from "./ProductPrimary";
import ProductSecondary from "./ProductSecondary";
import ProductSquare from "./ProductSquare";
import { queries } from "@queries";
import { ProductCardProps } from "@types";

export default function FeaturedProducts(): JSX.Element {
  const [fetchFeaturedCategory, { loading: fetching, data: featuredDB }] =
    useLazyQuery(queries.fetchFeaturedProducts);

  const [featured, setFeatured] = useState<Array<ProductCardProps>>([]);

  const memoizeFeatured = useMemo(() => featured, [featured]);

  useEffect(() => {
    fetchFeaturedCategory();
  }, []);

  useEffect(() => {
    setFeatured(featuredDB?.featuredProducts);
  }, [featuredDB]);


  return (
    <div className="featured-products w-full h-full flex flex-col gap-10 ">
      <h2 className="font-semibold text-primaryText/95 text-2xl font-primary">
        Featured Products
      </h2>
      <div className="md:grid grid-cols-2 gap-10 ">
        <div className="w-full h-[60%] sm:h-full flex flex-col mb-4 sm:mb-0">
          {memoizeFeatured?.length ? (
            <ProductPrimary {...memoizeFeatured[0]} />
          ) : null}
        </div>
        <div className="w-full h-full md:flex gap-10 ">
          <div className=" md:w-[50%] flex flex-col gap-10">
            {memoizeFeatured?.length ? (
              <>
                <ProductSquare {...memoizeFeatured[1]} />
                <ProductSquare {...memoizeFeatured[2]} />
              </>
            ) : null}
          </div>
          <div className="md:w-[50%] h-[60%] sm:h-[100%] mt-4 sm:mt-0  sm:pb-0 ">
            {memoizeFeatured?.length ? (
              <ProductSecondary {...memoizeFeatured[3]} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
