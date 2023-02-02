import {
  memo,
  useEffect,
  useCallback,
  useMemo,
  useState,
  useContext,
} from "react";
import { useLazyQuery } from "@apollo/client";
import { motion, AnimatePresence } from "framer-motion";

import { MdOutlineArrowBackIosNew } from "react-icons/md";

import type { CategoriesProps } from "@types";
import MobileTabs from "./MobileTabs";
import { queries } from "@queries";
import { UiConext } from "@context";
import { useDimensions } from "@hooks";

function MobileSidebarCategory(): JSX.Element {
  //@context
  const { mobileCategoryState, hideMobileCategory } = useContext(UiConext);

  const [dimensions] = useDimensions();

  //Queries
  const [fetchCategory, { loading: fetchingCategory, data: categoryDB }] =
    useLazyQuery(queries.headerCategories, {
      initialFetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-only",
    });

  //@states
  const [categories, setCategories] = useState<Array<CategoriesProps>>([]);

  //@memoize
  const memoizeCategories = useMemo(() => categories, [categories]);

  const memoizeRenderCategories = useMemo(
    () => renderCategories(),
    [memoizeCategories, fetchingCategory]
  );

  //@hooks
  useEffect(() => {
    if (dimensions?.width < 600) {
      fetchCategory();
    }
  }, [dimensions]);

  useEffect(() => {
    setCategories(categoryDB?.categoriesHeader);
  }, [categoryDB]);

  function renderCategories() {
    const loadingArr = new Array(10).fill(null);

    if (fetchingCategory) {
      return loadingArr?.map((el, i) => (
        <div key={i} className="w-full flex justify-between items-center">
          <div className="w-[60%] h-6 rounded-md bg-gray-300 animate-pulse" />
          <div className="w-5 h-5 rounded-full bg-gray-300 animate-pulse"></div>
        </div>
      ));
    }

    return memoizeCategories?.map((el, i) => (
      <MobileTabs key={i} title={el?.name} slug={el?.slug} />
    ));
  }


  return (
    <AnimatePresence>
      {mobileCategoryState && (
        <motion.div
          initial={{
            opacity: 0,
            x: "-100%",
          }}
          animate={{
            opacity: 1,
            x: "0%",
          }}
          transition={{
            type: "keyframes",
          }}
          exit={{
            opacity: 0,
            x: "-100%",
          }}
          className="sm:hidden absolute z-[9999] bg-backgroundColorSecondary w-full h-full py-10 flex flex-col"
        >
          <div className="w-full flex items-center h-20 justify-between px-6">
            <h2 className="text-md font-bold font-primary text-primaryText">
              Cart
            </h2>
            <MdOutlineArrowBackIosNew
              size={20}
              className=""
              onClick={hideMobileCategory}
            />
          </div>
          <div className="w-full flex flex-col gap-4 mt-10  h-full overflow-y-scroll px-6 ">
            {memoizeRenderCategories}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(MobileSidebarCategory);
