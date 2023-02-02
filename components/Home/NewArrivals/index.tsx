import React, { useEffect, useState, useMemo } from "react";

import { CardPrimary, LoadingCardPrimary } from "@uiUtils";
import { useQuery } from "@apollo/client";
import { queries } from "@queries";
import type { ProductCardProps } from "@types";

export default function NewArrivals(): JSX.Element {
  const { data, loading } = useQuery(queries.newArrival, {
    initialFetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });

  //@states
  const [products, setProducts] = useState<Array<ProductCardProps>>([]);
  const [toggle, setToggle] = useState(false);

  //@memoizatin
  const memoizeProducts = useMemo(() => products, [products]);
  const memoizeRender = useMemo(() => render(), [memoizeProducts, loading]);

  useEffect(() => {
    if (!data?.newArrival?.length) return;

    setProducts(data?.newArrival);
  }, [data]);

  function render() {
    const loadingArr = new Array(20).fill(null);

    if (loading) {
      return loadingArr?.map((_el, i) => <LoadingCardPrimary key={i} />);
    }

    return products?.map((el, i) => <CardPrimary key={i} {...el} />);
  }

  return (
    <div className="new-arrivals w-full h-[100rem] flex flex-col gap-10">
      <h2 className="font-semibold text-primaryText/95 text-2xl font-primary">
        New Arrivals
      </h2>
      <div className="w-full md:grid-cols-4 grid-cols-1 mx-auto sl:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-6 grid grid-flow-row gap-y-10">
        {memoizeRender}
      </div>
    </div>
  );
}
