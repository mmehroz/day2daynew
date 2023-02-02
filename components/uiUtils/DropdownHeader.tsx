//@ts-nocheck
import { memo, useEffect, useState, useMemo, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { MdArrowBackIosNew } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import {
  Category as CategoryProps,
  HeaderDropdown,
  HeaderDropDownCategory,
} from "@types";
import { queries } from "@queries";

function DropdownHeader({ parent }: HeaderDropdown): JSX.Element {
  const [
    fetchCategory,
    { loading: fetchingCategory, data: categoryDB, error },
  ] = useLazyQuery(queries?.fetchCategory, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    initialFetchPolicy: "cache-first",
  });

  const [category, setCategory] = useState<HeaderDropDownCategory>(null);

  useEffect(() => {
    setCategory(categoryDB?.category);
  }, [categoryDB]);

  useEffect(() => {
    if (!parent?.length) return;

    fetchCategory({
      variables: {
        slug: parent,
      },
    });
  }, [parent]);

  function renderCategories() {
    const arr = new Array(6).fill(null);

    if (fetchingCategory) {
      return arr?.map((_, i) => (
        <div key={i} className="w-full flex px-2 mb-2">
          <div className="w-full  bg-gray-300 p-4 py-4 rounded-md animate-pulse"></div>
        </div>
      ));
    }

    return category?.child?.map((el, i) => (
      <MemoizeCategory
        key={i}
        name={el?.name}
        icon={el?.child?.length > 0}
        childs={el?.child}
        parentSub={el?.slug}
        parentMain={parent}
        brands={el.brands}
      />
    ));
  }

  return (
    <div className="w-full flex flex-col p-4 px-0">{renderCategories()}</div>
  );
}

function Category({
  name,
  icon,
  childs,
  parentSub,
  parentMain,
  brands,
}: {
  name: string;
  icon: any;
  parentSub: string;
  parentMain: string;
  childs: Array<CategoryProps>;
  brands: Array<CategoryProps>;
}): JSX.Element {
  const [show, setShow] = useState<boolean>(false);
  const [showBrand, setShowBrand] = useState(false);

  const setShowTrue = useCallback((): void => {
    if (brands?.length) {
      setShowBrand(true);
    }

    if (!icon) return;
    setShow(true);
  }, [icon, childs]);

  const setShowHide = useCallback((): void => {
    if (brands?.length) {
      setShowBrand(false);
    }
    if (!icon) return;
    setShow(false);
  }, [icon, childs]);

  return (
    <>
      <Link passHref href={`/category/${parentMain}/${parentSub}`}>
        <div
          onMouseEnter={setShowTrue}
          onMouseLeave={setShowHide}
          className="px-1"
        >
          <div className="rounded-md hover:bg-gradient-to-tr to-main from-mainSecondary hover:text-white w-full p-2 px-3 text-sx font-primary flex items-center justify-between">
            <h2>{name?.toUpperCase()}</h2>
            {(childs?.length > 0 || brands?.length > 0) && (
              <MdArrowBackIosNew className="rotate-180" />
            )}
          </div>
        </div>
      </Link>

      <AnimatePresence>
        {showBrand && (
          <>
            <div
              onMouseEnter={setShowTrue}
              className="w-full  absolute h-12 top-2 ml-10 -z-10"
            ></div>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                type: "keyframes",
              }}
              className={`w-full bg-backgroundColorSecondary absolute h-96 flex flex-col rounded-md top-0 ${
                show ? "ml-[32rem]" : "ml-64"
              }`}
            >
              <MemoizeDropDownInner
                data={brands}
                hide={setShowHide}
                show={setShowTrue}
                parentMain={parentMain}
                parentSub={parentSub}
                brand
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {show && (
          <>
            <div
              onMouseEnter={setShowTrue}
              className="w-full  absolute h-12 top-2  ml-10 -z-10"
            ></div>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                type: "keyframes",
              }}
              className={`w-full bg-backgroundColorSecondary absolute h-96 flex flex-col   rounded-md top-0 ml-64`}
            >
              <MemoizeDropDownInner
                data={childs}
                hide={setShowHide}
                show={setShowTrue}
                parentMain={parentMain}
                parentSub={parentSub}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function DropDownInner({
  data,
  show,
  hide,
  parentMain,
  parentSub,
  brand,
}: {
  data: Array<CategoryProps>;
  hide: () => void;
  show: () => void;
  parentMain: string;
  parentSub: string;
  brand?: boolean;
}): JSX.Element {
  const [showInner, setShowInner] = useState(false);

  return (
    <div
      onMouseLeave={() => {
        setShowInner(false);
        hide();
      }}
      onMouseEnter={() => {
        show();
        setShowInner(true);
      }}
      className={`w-full h-full flex  flex-col py-4 px-1  overflow-y-scroll `}
    >
      {data[0]?.slug === "earth-kratom" ? (
        <div
          className={`rounded-md  w-full p-2 px-3 text-sx font-primary  items-center justify-between`}
        >
          <h2
            className={`text-sx font-semibold font-primary text-primaryText `}
          >
            Brands
          </h2>
        </div>
      ) : null}

      {brand && (
        <div
          className={`rounded-md  w-full p-2 px-3 text-sx font-primary  items-center justify-between`}
        >
          <h2
            className={`text-sx font-semibold font-primary text-primaryText `}
          >
            {data[0]?.name?.toLowerCase() === "salt" ||
            data[0]?.name?.toLowerCase() === "free base"
              ? parentSub?.toUpperCase()?.split("-")?.join(" ")
              : "Brands"}
          </h2>
        </div>
      )}

      {data?.map((el, i) => (
        <>
          <Inside
            parentMain={parentMain}
            parentSub={parentSub}
            {...el}
            brand={brand}
            last={data?.length ? true : false}
          />
        </>
      ))}
    </div>
  );
}

function Inside({ brand, slug, parentMain, parentSub, name, brands, last }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Link
        passHref
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        href={
          brand
            ? `/brand//${parentSub}/${slug}`
            : `/category/${parentMain}/${parentSub}/${slug}`
        }
      >
        <div className="rounded-md hover:bg-gradient-to-tr to-main from-mainSecondary  hover:text-white w-full p-2 px-3 text-sx font-primary flex items-center justify-between">
          <h2>{name?.toUpperCase()}</h2>
          {parentSub !== "herbal-supplements" && brands?.length > 0 && (
            <MdArrowBackIosNew className="rotate-180" />
          )}
        </div>
        {parentSub !== "herbal-supplements" &&
          show &&
          (brands?.length ? (
            <div
              className={`absolute h-96 flex flex-col z-[99999999999] ${
                last ? "ml-[16rem]" : "ml-64"
              }  bg-backgroundColorSecondary w-60 top-0 rounded-md p-2 overflow-y-scroll`}
            >
              {/[0-9]/.test(brands[0]?.name) ? null : (
                <h2
                  className={`text-sx font-semibold text-primaryText font-primary m-2 `}
                >
                  {brands[0]?.name?.toLowerCase() === "salt" ||
                  brands[0]?.name?.toLowerCase() === "free base" ||
                  brands[0]?.name?.toLowerCase()?.includes("capsules")
                    ? slug?.toUpperCase()?.split("-")?.join(" ")
                    : "Brands"}
                </h2>
              )}

              {brands?.map((el, i) => {
                return (
                  <Link key={i} passHref href={`/brand/${slug}/${el?.slug}`}>
                    <div
                      key={i}
                      className="rounded-md hover:bg-gradient-to-tr to-main from-mainSecondary hover:text-white w-full p-2 px-3 text-sx font-primary flex items-center justify-between"
                    >
                      <h2>{el?.name?.toUpperCase()}</h2>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : null)}
      </Link>
    </>
  );
}

const MemoizeCategory = memo(Category);
const MemoizeDropDownInner = memo(DropDownInner);

export default memo(DropdownHeader);
