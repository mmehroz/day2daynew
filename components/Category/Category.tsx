import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import Image from "next/image";

import { CardPrimary, LoadingCardPrimary, ButtonPrimary } from "@uiUtils";
import { queries } from "@queries";
import type { ProductCardProps } from "@types";
import { FilteredContext } from "context/filtersContext";
import { useDimensions } from "@hooks";

import NoDataPlaceholder from "../../assets/images/no-data.svg";

export default function Main() {
  const router = useRouter();
  const [dimensions] = useDimensions();

  //@queries
  const [fetchProducts, { loading, data }] = useLazyQuery(
    queries.productsByCategory,
    {
      initialFetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-only",
    }
  );

  const [fetchSaleProducts, { loading: fetchingSale, data: saleProducts }] =
    useLazyQuery(queries.fetchSaleProducts, {
      initialFetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-only",
    });

  const [fetchFlashSale, { data: flashSale, loading: loadingFlash }] =
    useLazyQuery(queries.flashSale, {
      initialFetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-only",
    });

  const [fetchBrandProduct, { loading: brandLoading, data: brandsData }] =
    useLazyQuery(queries.fetchBrandProduct, {
      initialFetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-only",
    });

  const [loadMore, { loading: fetchMoreLoading, data: fetchMoreData }] =
    useLazyQuery(queries.loadMoreMain);
  const [
    loadMoreSub,
    { loading: fetchMoreSubLoading, data: fetchMoreSubData },
  ] = useLazyQuery(queries.loadMoreSub);

  const [
    loadMoreInner,
    { loading: fetchMoreInnerLoading, data: fetchMoreInnerData },
  ] = useLazyQuery(queries.loadMoreInner);
  const [
    fetchMoreBrandProduct,
    { loading: fetchingMoreBrandProduct, data: fetchMoreBrandProducts },
  ] = useLazyQuery(queries.fetchMoreBrandProduct);

  const { products: filteredProducts, fetchingFilteredProduct } =
    useContext(FilteredContext);

  //@states
  const [products, setProducts] = useState<Array<ProductCardProps>>([]);
  const [copyProducts, setCopyProducts] = useState<Array<ProductCardProps>>([]);
  const [hardRefetch, setHardRefetch] = useState<boolean>(false);
  const [hideLoadMore, setHideLoadMore] = useState(false);
  // const [moneyFilter, setMoneyFilter] = useState(false);

  //@memoize
  const memoizeProducts = useMemo(() => products, [products]);
  const memoizeRenderProducts = useMemo(
    () => renderProducts(),
    [
      memoizeProducts,
      loading,
      fetchingFilteredProduct,
      dimensions?.width,
      brandLoading,
      loadingFlash,
    ]
  );
  const memoizeLoadMore = useCallback(
    () => handleLoadMore(),
    [memoizeProducts, router?.query?.category]
  );

  //@hooks
  useEffect(() => {
    if (filteredProducts === null) {
      setHardRefetch(!hardRefetch);
      return;
    }

    //@ts-ignore
    setProducts(filteredProducts);
    setCopyProducts(filteredProducts);
  }, [filteredProducts]);

  useEffect(() => {
    setProducts(brandsData?.brandProduct);
    setCopyProducts(brandsData?.brandProduct);
  }, [brandsData]);

  useEffect(() => {
    if (!fetchMoreInnerData?.categoryProducts?.LoadMoreInnerProducts?.length)
      return;

    setProducts((prev) =>
      prev.concat(fetchMoreInnerData?.categoryProducts?.LoadMoreInnerProducts)
    );
    setCopyProducts((prev) =>
      prev.concat(fetchMoreInnerData?.categoryProducts?.LoadMoreInnerProducts)
    );
  }, [fetchMoreInnerData]);

  useEffect(() => {
    if (!fetchMoreSubData?.categoryProducts?.LoadMoreSubProducts?.length)
      return;

    setProducts((prev) =>
      prev.concat(fetchMoreSubData?.categoryProducts?.LoadMoreSubProducts)
    );

    setCopyProducts((prev) =>
      prev.concat(fetchMoreSubData?.categoryProducts?.LoadMoreSubProducts)
    );
  }, [fetchMoreSubData]);

  useEffect(() => {
    if (!fetchMoreBrandProducts?.brandProductLoadMore?.length) return;

    setProducts((prev) =>
      prev.concat(fetchMoreBrandProducts?.brandProductLoadMore)
    );
    setCopyProducts((prev) =>
      prev.concat(fetchMoreBrandProducts?.brandProductLoadMore)
    );
  }, [fetchMoreBrandProducts]);

  useEffect(() => {
    if (!fetchMoreData?.categoryProducts?.LoadMoreMainProducts?.length) return;

    setProducts((prev) =>
      prev.concat(fetchMoreData?.categoryProducts?.LoadMoreMainProducts)
    );
    setCopyProducts((prev) =>
      prev.concat(fetchMoreData?.categoryProducts?.LoadMoreMainProducts)
    );
  }, [fetchMoreData]);

  useEffect(() => {
    if (data?.categoryProducts?.MainProducts?.length) {
      setProducts(data?.categoryProducts?.MainProducts);
      setCopyProducts(data?.categoryProducts?.MainProducts);
    }

    if (data?.categoryProducts?.InnerProducts?.length) {
      setProducts(data?.categoryProducts?.InnerProducts);
      setCopyProducts(data?.categoryProducts?.InnerProducts);
    }

    if (data?.categoryProducts?.SubProducts?.length) {
      setProducts(data?.categoryProducts?.SubProducts);
      setCopyProducts(data?.categoryProducts?.SubProducts);
    }
  }, [data, hardRefetch]);

  useEffect(() => {
    if (!router?.query?.category && !router?.query?.brand) return;

    if (router?.query?.innercategory) {
      fetchProducts({
        variables: {
          slug: router?.query?.innercategory,
        },
      });

      return;
    }

    if (router?.query?.subcategory) {
      if (router?.query?.subcategory === "flash-sale") {
        fetchFlashSale();

        return;
      }

      fetchProducts({
        variables: {
          slug: router?.query?.subcategory,
        },
      });
      return;
    }

    if (router?.query?.brand) {
      fetchBrandProduct({
        variables: {
          slug: router?.query?.brand,
        },
      });

      return;
    }

    if (router?.query?.category === "sale") {
      fetchSaleProducts();
      return;
    }

    fetchProducts({
      variables: {
        slug: router?.query?.category,
      },
    });
  }, [router?.query, hardRefetch]);

  useEffect(() => {
    if (router?.asPath?.includes("?")) {
      setProducts(() => {
        const filtered = copyProducts?.filter((el) => {
          if (
            parseInt(el.discount_price?.toString()) >=
              parseInt(router?.query?.min?.toString()) &&
            parseInt(el?.discount_price?.toString()) <=
              parseInt(router?.query?.max?.toString())
          )
            return true;
        });

        return filtered;
      });
    }
  }, [router?.query]);

  useEffect(() => {
    setProducts(flashSale?.flashSale);
  }, [flashSale]);

  useEffect(() => {
    setProducts(saleProducts?.saleProducts);
  }, [saleProducts]);

  //@functions

  function handleLoadMore() {
    if (!router?.query?.category && !router?.query?.brand) return;

    if (router?.query?.brand) {
      fetchMoreBrandProduct({
        variables: {
          slug: router?.query?.brand,
          brandProductLoadMoreId:
            memoizeProducts[memoizeProducts?.length - 1]?.slug,
        },
      }).then((res) => {
        if (!res?.data?.brandProductLoadMore?.length) {
          setHideLoadMore(true);
        }
      });
      return;
    }

    if (router?.query?.innercategory) {
      loadMoreInner({
        variables: {
          slug: router?.query?.innercategory,
          lastPSlug: memoizeProducts[memoizeProducts?.length - 1]?.slug,
        },
      }).then((res) => {
        if (!res?.data?.categoryProducts?.LoadMoreInnerProducts?.length) {
          setHideLoadMore(true);
          return;
        }
      });
    }

    if (router?.query?.subcategory) {
      loadMoreSub({
        variables: {
          slug: router?.query?.subcategory,
          lastPSlug: memoizeProducts[memoizeProducts?.length - 1]?.slug,
        },
      }).then((res) => {
        if (!res?.data?.categoryProducts?.LoadMoreSubProducts?.length) {
          setHideLoadMore(true);
        }
      });

      return;
    }

    loadMore({
      variables: {
        slug: router?.query?.category,
        lastPSlug: memoizeProducts[memoizeProducts?.length - 1]?.slug,
      },
    }).then((res) => {
      if (res?.data?.categoryProducts?.LoadMoreMainProducts?.length) {
        setHideLoadMore(true);
      }
    });
  }

  function renderPorductsWidth() {
    let pWidth: string = "";

    if (dimensions?.width <= 1930) {
      pWidth = "17rem";
    }

    if (dimensions?.width <= 1750) {
      pWidth = "15rem";
    }

    if (dimensions?.width <= 1540) {
      pWidth = "13rem";
    }

    // console.log("width: ", pWidth);

    return pWidth;
  }

  function renderProducts() {
    const loadingArr = new Array(20).fill(null);

    if (loading || fetchingFilteredProduct || brandLoading || loadingFlash) {
      return loadingArr?.map((_el, i) => (
        <LoadingCardPrimary width={"13.8rem"} key={i} />
      ));
    }

    if (memoizeProducts?.length === 0) {
      return (
        <div className="w-[100%] flex h-full items-center justify-center absolute left-[10%] top-10 flex-col">
          <div className="w-[25rem] h-[25rem] 2xl:w-[30rem] 2xl:h-[30rem] relative ">
            <Image
              src={NoDataPlaceholder}
              alt="No Data Found"
              className="object-cover"
              fill
              unoptimized
            />
          </div>
          <h2 className="text-base font-primary text-main font-bold">
            OOPS! No Data Found Try Something Different!
          </h2>
        </div>
      );
    }

    return memoizeProducts?.map((el, i) => (
      <CardPrimary key={i} width={renderPorductsWidth()} {...el} />
    ));
  }

  function rendertitle(): string {
    if (router?.query?.brand) {
      return router?.query?.brand
        ?.toString()
        ?.split(router?.query?.category?.toString())
        ?.join(" ")
        ?.split("-")
        ?.join(" ")
        ?.toUpperCase()
        ?.toString();
    }

    return data?.categoryProducts?.name;
  }

  function showLoadMore(): boolean {
    let show: boolean = false;

    if (Number.isInteger(memoizeProducts?.length / 20)) {
      show = true;
    }

    if (hideLoadMore) {
      show = false;
    }

    return show;
  }

  return (
    <div className="w-[100%] 3xl:w-[80%] mt-10 sm:mt-20 h-full overflow-y-scroll py-4  pb-40 sm:pb-20 md:pl-10  ">
      <h2 className="font-primary font-bold text-primaryText text-md mt-14">
        {rendertitle()}
      </h2>
      <div className="w-full md:grid-cols-4 md:gap-x-5 grid-cols-1 mx-auto sl:grid-cols-2 2xl:grid-cols-5 grid grid-flow-row gap-y-10 mt-10">
        {memoizeRenderProducts}
      </div>
      {memoizeProducts?.length > 0 && (
        <div className="w-full mt-10 flex items-center justify-center pb-10">
          {showLoadMore() && (
            <ButtonPrimary
              loading={
                fetchMoreLoading ||
                fetchMoreSubLoading ||
                fetchMoreInnerLoading ||
                fetchingMoreBrandProduct
              }
              onClick={memoizeLoadMore}
              title="Load More"
              style={{ color: "white" }}
            />
          )}
        </div>
      )}
    </div>
  );
}
