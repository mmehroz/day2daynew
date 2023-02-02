import { Select } from "@uiUtils";
import { memo, useEffect, useState, useCallback, useContext } from "react";
import { useLazyQuery } from "@apollo/client";

import type { DevicesFilters } from "@types";
import { queries } from "@queries";
import SidebarTabs from "./SidebarTabs";
import { FilteredContext } from "context/filtersContext";

interface ChildsProps {
  name: string;
  id: string;
}

function DevicesFilters({ title, id }: DevicesFilters) {
  const [fetchChilds, { loading: fetchingChilds, data: filtersChildsDb }] =
    useLazyQuery(queries.filtersChild);

  const { fetchFilter, clearFilters } = useContext(FilteredContext);

  //@states
  const [filtersChilds, setFiltersChild] = useState<Array<ChildsProps>>([]);

  //@memoization
  const memoizeHandleCheckClick = useCallback(
    (
      id: string,
      check: boolean,
      filters: Array<{ name: string; id: string }>,
      name: string
    ) => handleCheckClick(id, check, filters, name),
    []
  );

  //@hooks
  useEffect(() => {
    setFiltersChild(filtersChildsDb?.filtersType?.filters);
  }, [filtersChildsDb]);

  function handleClick() {
    fetchChilds({
      variables: {
        filtersTypeId: id,
      },
    });
  }

  function handleCheckClick(
    id: string,
    check: boolean,
    filters: Array<{ name: string; id: string }>,
    name: string
  ) {
    if (check) {
      fetchFilter(id, filters, name);
      return;
    }

    clearFilters(id, filters);
  }

  function renderChilds() {
    const arr = new Array(10).fill(null);

    // console.log("filters childs: ", filtersChilds);

    if (fetchingChilds) {
      return arr?.map((_el, i) => (
        <div key={i} className="w-full flex items-center gap-4">
          <div className="w-5 h-5 rounded-tiny bg-gray-300 animate-pulse"></div>
          <h2 className="w-[50%] h-4 rounded-md bg-gray-300 animate-pulse"></h2>
        </div>
      ));
    }

    return filtersChilds?.map((el, i) => (
      <div key={i} className="w-full flex gap-2 ">
        <Select
          name={el?.name}
          id={el?.id}
          handleClick={memoizeHandleCheckClick}
        />
        <h2 className="h-4 rounded-md text-sx font-semibold mb-3">
          {el?.name}
        </h2>
      </div>
    ));
  }

  return (
    <>
      <div className="w-full h-1 border-b" />
      <SidebarTabs onClick={handleClick} title={title}>
        <div className="mt-8 flex flex-col h-40 w-full text-primaryText overflow-y-scroll gap-4">
          {renderChilds()}
        </div>
      </SidebarTabs>
    </>
  );
}

export default memo(DevicesFilters);
