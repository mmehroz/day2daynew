import { memo, useState, useEffect, useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import { motion } from "framer-motion";
import Link from "next/link";

import { queries } from "@queries";
import { HeaderDropDownCategory } from "@types";
import MobileTabs from "./MobileTabs";
import { UiConext } from "@context";

function MobileCategoryDropDown({
  slug,
  parent,
}: {
  slug: string;
  parent: string;
}): JSX.Element {
  const [fetchCategory, { loading: fetchingCategory, data: categoryDB }] =
    useLazyQuery(queries?.fetchMobileCategory);

  const { hideMobileCategory } = useContext(UiConext);

  const [category, setCategory] = useState<HeaderDropDownCategory>(null);

  useEffect(() => {
    setCategory(categoryDB?.category);
  }, [categoryDB]);

  useEffect(() => {
    // console.log(slug);
    if (!slug) return;
    fetchCategory({
      variables: {
        slug,
      },
    });
  }, [slug]);

  function renderCategories() {
    const array = new Array(10).fill(null);

    if (fetchingCategory) {
      return array?.map((el, i) => (
        <div
          key={i}
          className="w-full h-2 rounded-full bg-gray-300 animate-pulse"
        />
      ));
    }

    return category?.child?.map((el, i) => (
      <motion.div
        key={i}
        initial={{
          opacity: 0,
          x: "-20%",
        }}
        animate={{
          opacity: 1,
          x: "0%",
        }}
        className="w-full flex  justify-between flex-col"
      >
        <MobileTabs slug={el?.slug} title={el?.name} key={i} />
      </motion.div>
    ));
  }

  return (
    <div className="w-full flex flex-col p-2 my-2 gap-4">
      <Link onClick={hideMobileCategory} passHref href={`/category/${slug}`}>
        <h2 className="font-bold font-primary text-main text-sx">{parent}</h2>
      </Link>
      {renderCategories()}
    </div>
  );
}

export default memo(MobileCategoryDropDown);
