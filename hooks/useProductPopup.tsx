import { useLazyQuery } from "@apollo/client";
import { queries } from "@queries";
import { useState, useCallback, useEffect, useMemo } from "react";

import type { ProductPopupDataProps } from "@types";

export const useProductPopup = (): [
  boolean,
  boolean,
  ProductPopupDataProps,
  () => void,
  (slug: string) => void
] => {
  const [fetchProduct, { loading: loadingPopup, data: productDB, error }] =
    useLazyQuery(queries.fetchProductPopup, {
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-only",
    });

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductPopupDataProps>();

  // console.log("error product popup: ", error);
  // console.log("product popup: ", productDB);

  // console.log(product);
  

  //@memoization
  const memoizeProduct = useMemo(() => product, [product]);

  useEffect(() => {
    setProduct(productDB?.productPopup);
  }, [productDB]);

  const dispatchPopup = useCallback(() => {
    setShowPopup((prev) => !prev);
  }, []);

  const fetchProductDetails = useCallback((slug: string) => {
    fetchProduct({
      variables: {
        slug: slug,
      },
    });
  }, []);

  return [
    showPopup,
    loadingPopup,
    memoizeProduct,
    dispatchPopup,
    fetchProductDetails,
  ];
};
