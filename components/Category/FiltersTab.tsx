import { memo } from "react";
import { IoCloseSharp } from "react-icons/io5";

function FiltersTab({
  title,
  showIcon,
  id,
  clearFilter,
  filters,
}: {
  title: string;
  showIcon: boolean;
  filters: Array<{ name: string; id: string }>;
  clearFilter: (
    id: string,
    filtersId: Array<{ name: string; id: string }>
  ) => void;
  id: string;
}): JSX.Element {
  function handleClick() {
    clearFilter(id, filters);
  }

  return (
    <div
      key={id}
      className="px-4 py-3 rounded-md bg-backgroundColorThird flex items-center justify-center gap-2 text-xs"
    >
      <h2 className="uppercase font-primary">{title}</h2>
      {showIcon && (
        <IoCloseSharp
          //@ts-ignore
          onClick={handleClick}
          className="text-primaryText/60 hover:text-primaryText/80 cursor-pointer"
        />
      )}
    </div>
  );
}

export default memo(FiltersTab);
