import { memo, useState, useContext, useEffect } from "react";
import { BsCheck } from "react-icons/bs";

import type { Selector } from "@types";
import { FilteredContext } from "context/filtersContext";
import { useRouter } from "next/router";

function Select({
  checked: propChecked,
  handleClick: handleParentClick,
  id,
  name,
  slug,
}: Selector): JSX.Element {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(propChecked || false);
  const { filters } = useContext(FilteredContext);

  useEffect(() => {
    const parsedSlug = name?.toLowerCase()?.split(" ")?.join("-");

    // console.log("brands: ", router?.query?.brand === slug);
    // console.log("subcategory: ", router?.query?.subcategory === parsedSlug);
    // console.log("innercategory: ", router?.query?.innercategory === parsedSlug);
    // console.log(router?.query?.brand);
    // console.log("brand");
    // console.log("slug", slug);

    if (router?.query?.subcategory === parsedSlug) {
      setChecked(true);
      return;
    }

    if (router?.query?.innercategory === parsedSlug) {
      setChecked(true);
      return;
    }

    if (router?.query?.brand === slug && slug?.length > 0) {
      setChecked(true);
      return;
    }

    if (!filters?.length) {
    	setChecked(false);
    	return;
    }

    const isExisted = filters?.find(el => el?.id === id);
    if (!isExisted?.id) {
    	setChecked(false);
    	return;
    }

    setChecked(true);
  }, [filters, router?.query]);

  function handleClick(e) {
    setChecked(!checked);
    handleParentClick(id, !checked, filters, name);
  }

  return (
    <div
      onClick={handleClick}
      className={`w-5 flex items-center justify-center h-5 rounded-tiny border bg-backgroundColorThird cursor-pointer hover:bg-gray-400 ${
        checked && "bg-gradient-to-tr to-main from-mainSecondary"
      } `}
    >
      {checked && <BsCheck className="text-white" />}
    </div>
  );
}

export default memo(Select);
