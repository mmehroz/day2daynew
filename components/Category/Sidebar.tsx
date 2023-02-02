import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";

import Header from "./Header";
import SidebarTabs from "./SidebarTabs";
import DevicesFilters from "./DevicesFilters";
import EliquidsFilters from "./EliquidsFilters";
import AccessoriesFilters from "./AccessoriesFilters";
import FiltersTab from "./FiltersTab";
import { ButtonPrimary, RangeSlider, Select } from "@uiUtils";
import { queries } from "@queries";
import type { FiltersTypes, ParentChildCategory, BrandsProps } from "@types";
import { FilteredContext } from "@context";

export default function Category() {
  const router = useRouter();

  const { filters, clearFilters } = useContext(FilteredContext);

  const [
    fetchFiltersType,
    { loading: fetchingFiltersTypes, data: filtersTypesData },
  ] = useLazyQuery(queries.categoryFilters, {
    initialFetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });

  const [
    fetchCategoriesChild,
    { loading: fetchingCategoriesChild, data: categoriesChildData },
  ] = useLazyQuery(queries.categoriesChilds, {
    initialFetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });

  const [
    fetchMainCategories,
    { loading: loadingCategories, data: mainCategories },
  ] = useLazyQuery(queries.headerCategories, {
    initialFetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });

  const [fetchBrands, { loading: fetchingBrands, data: brandsData }] =
    useLazyQuery(queries.fetchBrandByCat, {
      initialFetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-only",
    });

  //@states
  const [filtersType, setFiltersType] = useState<Array<FiltersTypes>>([]);
  const [categories, setCategories] = useState<Array<ParentChildCategory>>([]);
  const [brands, setBrands] = useState<Array<BrandsProps>>([]);

  //@memoization
  const memoizeCategories = useMemo(() => categories, [categories]);
  const memoizeBrands = useMemo(() => brands, [brands]);

  const memoizeRenderCategories = useMemo(
    () => renderCategories(),
    [memoizeCategories, fetchingCategoriesChild, router?.query]
  );
  const memoizeFiltersType = useMemo(() => filtersType, [filtersType]);
  const memoizeRenderFilters = useMemo(
    () => renderFilters(),
    [memoizeFiltersType, fetchingFiltersTypes, router?.query]
  );

  const memoizeHandleFetchCategoriesChild = useCallback(
    () => hanldeFetchCategoriesChild(),
    [router?.query]
  );
  const memoizeFetchBrands = useCallback(
    () => handleFetchBrands(),
    [router?.query]
  );
  const memoizeBrandsRender = useMemo(
    () => renderBrands(),
    [fetchingBrands, memoizeBrands, router?.query]
  );

  // @hooks

  useEffect(() => {
    setBrands(brandsData?.brandByCat);
  }, [brandsData]);

  useEffect(() => {
    hanldeFetchCategoriesChild();
  }, [router?.query]);

  useEffect(() => {
    if (!categoriesChildData?.categoryProducts?.child?.length) return;

    setCategories(categoriesChildData?.categoryProducts?.child);
  }, [categoriesChildData]);

  useEffect(() => {
    setFiltersType(filtersTypesData?.categoryFiltersType);
  }, [filtersTypesData]);

  useEffect(() => {
    if (!router?.query?.category) return;

    if (router?.query?.innercategory) {
      fetchFiltersType({
        variables: {
          slug: router?.query?.innercategory,
        },
      });

      return;
    }

    if (router?.query?.subcategory) {
      fetchFiltersType({
        variables: {
          slug: router?.query?.subcategory,
        },
      });

      return;
    }

    if (router?.query?.category) {
      fetchFiltersType({
        variables: {
          slug: router?.query?.category,
        },
      });

      return;
    }
  }, [router?.query]);

  // useEffect(() => {
  // 	setBrands(allBrands?.brands);
  // }, [allBrands]);

  useEffect(() => {
    setCategories(mainCategories?.categoriesHeader);
  }, [mainCategories]);

  const removeFilter = useCallback(
    (id: string, filtersId: Array<{ name: string; id: string }>) => {
      clearFilters(id, filtersId);
    },
    []
  );

  function renderFilters() {
    const arr = new Array(5).fill(null);
    if (fetchingFiltersTypes) {
      return arr?.map((_, i) => (
        <React.Fragment key={i}>
          <div className="w-full h-1 border-b" />
          <div className="w-full h-4 bg-gray-300 rounded-full animate-pulse" />
        </React.Fragment>
      ));
    }

    return memoizeFiltersType?.map((el, i) => (
      <DevicesFilters key={i} id={el?.id} title={el?.name} />
    ));

    // if (router?.asPath?.includes("e-liquids")) {
    //   return <EliquidsFilters />;
    // }

    // if (router?.asPath?.includes("accessories")) {
    //   return <AccessoriesFilters />;
    // }
  }

  function renderCategories() {
    const arr = new Array(5).fill(null);

    if (fetchingCategoriesChild) {
      return arr?.map((_, i) => (
        <div key={i} className="w-full flex items-center gap-4">
          <div className="w-5 h-5 rounded-tiny bg-gray-300 animate-pulse"></div>
          <h2 className="w-[50%] h-4 rounded-md bg-gray-300 animate-pulse"></h2>
        </div>
      ));
    }

    return memoizeCategories?.map((el, i) => {
      return (
        <Link
          key={i}
          passHref
          href={
            router?.query?.brand
              ? `/category/${el?.slug}`
              : `/category/${categoriesChildData?.categoryProducts?.slug}/${el?.slug}`
          }
        >
          <div key={i} className="w-full flex gap-2 ">
            <Select handleClick={() => {}} id={el?.id} name={el?.name} />
            <h2 className="h-4 rounded-md text-sx font-semibold mb-3">
              {el?.name}
            </h2>
          </div>
        </Link>
      );
    });
  }

  function hanldeFetchCategoriesChild() {
    if (router?.query?.brand) {
      fetchMainCategories();
      return;
    }

    if (router?.query?.subcategory) {
      fetchCategoriesChild({
        variables: {
          slug: router?.query?.subcategory,
          active: true,
        },
      });

      return;
    }
    if (router?.query?.category) {
      fetchCategoriesChild({
        variables: {
          slug: router?.query?.category,
          active: true,
        },
      });

      return;
    }
  }

  function handleFetchBrands() {
    if (router?.query?.brand) {
      if (router?.query?.category) {
        fetchBrands({
          variables: {
            slug: router?.query?.category,
          },
        });
        return;
      }
      return;
    }

    if (router?.query?.innercategory) {
      fetchBrands({
        variables: {
          slug: router?.query?.innercategory,
        },
      });
      return;
    }
    if (router?.query?.subcategory) {
      fetchBrands({
        variables: {
          slug: router?.query?.subcategory,
        },
      });
      return;
    }

    fetchBrands({
      variables: {
        slug: router?.query?.category,
      },
    });
  }

  function renderBrands() {
    const arr = new Array(5).fill(null);

    if (fetchingBrands) {
      return arr?.map((_, i) => (
        <div key={i} className="w-full flex items-center gap-4">
          <div className="w-5 h-5 rounded-tiny bg-gray-300 animate-pulse"></div>
          <h2 className="w-[50%] h-4 rounded-md bg-gray-300 animate-pulse"></h2>
        </div>
      ));
    }

    const getCategory = (): string => {
      if (router?.query?.innercategory) {
        return router?.query?.innercategory?.toString();
      }

      if (router?.query?.subcategory) {
        return router?.query?.subcategory?.toString();
      }

      if (router?.query?.category) {
        return router?.query?.category?.toString();
      }
    };

    const getSlug = (slug: string): string => {
      console.log(router?.query?.subcategory);
      console.log(router?.query?.subcategory?.toString()?.length === 0);

      if (
        router?.query?.category?.toString() === "devices" &&
        !router?.query?.subcategory &&
        !router?.query?.innercategory
      ) {
        return `/category/${router?.query?.category?.toString()}/${slug}`;
      }

      return `/brand/${getCategory()}/${slug}`;
    };

    return memoizeBrands?.map((el, i) => {
      return (
        <Link key={i} passHref href={getSlug(el?.slug)}>
          <div key={i} className="w-full flex gap-2 ">
            <Select
              handleClick={() => {}}
              id={el?.id}
              name={el.name}
              slug={el?.slug}
            />
            <h2 className="h-4 rounded-md text-sx font-semibold mb-3">
              {el?.name}
            </h2>
          </div>
        </Link>
      );
    });
  }

  function renderFiltersTabs() {
    const slugs: Array<{ name: string; slug: boolean; id: string }> = [];

    router?.query?.category &&
      slugs?.push({
        name: router?.query?.category?.toString(),
        slug: true,
        id: "",
      });

    router?.query?.subcategory &&
      slugs?.push({
        name: router?.query?.subcategory?.toString(),
        slug: true,
        id: "",
      });
    router?.query?.innercategory &&
      slugs?.push({
        name: router?.query?.innercategory?.toString(),
        slug: true,
        id: "",
      });

    const parsedFilters: Array<{ name: string; slug: boolean; id: string }> =
      filters?.map((el) => {
        return { name: el.name, slug: false, id: el.id };
      });

    const data = slugs.concat(parsedFilters);

    // console.log("filters: ", filters);

    return data?.map((el, i) => (
      <FiltersTab
        clearFilter={removeFilter}
        title={el?.name}
        showIcon={el?.slug === false}
        id={el?.id}
        filters={filters}
        key={i}
      />
    ));
  }

  function hideCategory(): boolean {
    let show: boolean = true;

    if (router?.query?.category?.toString() === "devices") {
      show = false;
    }

    if (router?.query?.innercategory?.toString()) {
      show = true;
    }

    if (router?.query?.subcategory?.toString()) {
      show = true;
    }

    return show;
  }

  return (
    <div className="w-[25%] 3xl:w-[20%] mt-20 text-black h-full overflow-y-scroll py-4 hidescrollbar pb-10">
      <Header />
      <div className="w-full flex flex-col mt-10 font-primary pr-4 gap-6">
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-md font-semibold text-primaryText/80">
              Filters
            </h2>
          </div>
          <div className="flex flex-wrap shrink-0  gap-2 mt-6">
            {renderFiltersTabs()}
            {router?.query?.max?.length ? (
              <FiltersTab
                clearFilter={() => {
                  router?.push(router?.asPath?.split("?")[0]);
                }}
                title={`Price  ${router?.query?.min?.toString()} - ${router?.query?.max?.toString()}`}
                showIcon={true}
                id={router?.query?.min?.toString()}
                filters={[]}
              />
            ) : null}
          </div>
        </div>

        {/* Categories  */}

        {hideCategory() && <div className="w-full h-1 border-b" />}

        <SidebarTabs
          onClick={memoizeHandleFetchCategoriesChild}
          title="Category"
          hide={hideCategory() ? false : true}
        >
          <div className="mt-8 flex flex-col h-40 w-full text-primaryText overflow-y-scroll gap-4">
            {memoizeRenderCategories}
          </div>
        </SidebarTabs>
        <div className="w-full h-1 border-b" />

        {/* Brands  */}
        <SidebarTabs onClick={memoizeFetchBrands} title="Brands">
          <div className="mt-8 flex flex-col h-40 w-full text-primaryText overflow-y-scroll gap-4">
            {memoizeBrandsRender}
          </div>
        </SidebarTabs>

        {/* Price  */}
        <div className="w-full h-1 border-b" />
        <SidebarTabs title="Price">
          <div className="mt-10 flex flex-col gap-6">
            <RangeSlider />
          </div>
        </SidebarTabs>

        {memoizeRenderFilters}

        <div className="w-full h-1 border-b" />
        <div className="w-full flex flex-col unvisible">
          <div
            id="parenthover"
            className="w-full flex justify-between items-center cursor-pointer"
          >
            <h2
              id="childeffect"
              className="text-base font-semibold text-primaryText"
            >
              Colors
            </h2>
            <MdOutlineArrowForwardIos id="childeffect" className="text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}
