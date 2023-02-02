import { useLazyQuery } from "@apollo/client";
import { queries } from "@queries";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import type { ProductCardProps, FiltersContext, FiltersProvider } from "@types";

export const FilteredContext = createContext<FiltersContext | null>(null);

export const Provider = ({ children }: FiltersProvider) => {
  const router = useRouter();

  const [
    fetchFilterProducts,
    { data: filteredProdct, loading: fetchingFilteredProduct },
  ] = useLazyQuery(queries.filterProducts, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
  });

  const [products, setProducts] = useState<Array<ProductCardProps>>([]);
  const [filters, setFilters] = useState<Array<{ name: string; id: string }>>(
    []
  );

  useEffect(() => {
    if (!filteredProdct?.filterById) return;

    const data = [];

    filteredProdct?.filterById?.forEach((el, i) => {
      data.push(...el?.products);
    });

    const filteredArr = data.reduce((acc, current) => {
      const x = acc.find((item) => item.slug === current.slug);

      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    setProducts(filteredArr);
  }, [filteredProdct]);

  function updateFilter(data: Array<{ name: string; id: string }>): void {
    setFilters(data);
  }

  function fetchFilter(
    id: string,
    filtersId: Array<{ name: string; id: string }>,
    name: string
  ): void {
    const data: Array<{ name: string; id: string }> = filtersId;
    data.push({ name, id });

    updateFilter(data);

    const fetchFilters = data?.map((el, i) => el.id);

    fetchFilterProducts({
      variables: {
        filterByIdId: fetchFilters,
        categorySlug: router?.query?.category,
        subCategorySlug: router?.query?.subcategory,
        innerCategorySlug: router?.query?.innercategory,
      },
    });
  }

  async function clearFilters(
    id: string,
    filtersId: Array<{ name: string; id: string }>
  ) {
    const data = filtersId?.filter((el, i) => el.id !== id);

    if (data?.length === 0) {
      updateFilter([]);
      setProducts(null);
      return;
    }

    const toFetch = data?.map((el) => el?.id);

    fetchFilterProducts({
      variables: {
        filterByIdId: toFetch,
        categorySlug: router?.query?.category,
        subCategorySlug: router?.query?.subcategory,
        innerCategorySlug: router?.query?.innercategory,
      },
      fetchPolicy: "network-only",
    });

    updateFilter(data);
  }

  const val: FiltersContext = {
    fetchFilter,
    products,
    fetchingFilteredProduct,
    clearFilters,
    filters,
  };

  return (
    <FilteredContext.Provider value={val}>{children}</FilteredContext.Provider>
  );
};
