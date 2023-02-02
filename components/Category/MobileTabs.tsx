import { memo, useState, useMemo, useCallback } from "react";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import MobileCategoryDropDown from "./MobileCategoryDropDown";

function MobileCategoryTabs({
  title,
  slug,
}: {
  title: string;
  slug: string;
}): JSX.Element {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClicked = useCallback(() => {
    setClicked(!clicked);
  }, [clicked]);

  return (
    <div className="w-full flex flex-col text-sx font-semibold font-primary text-primaryText ">
      <div
        onClick={handleClicked}
        className="w-full flex justify-between items-center"
      >
        <h2>{title}</h2>
        <MdOutlineArrowBackIosNew
          className={`duration-200 transition ${
            clicked ? "-rotate-90" : "rotate-180"
          }`}
        />
      </div>

      {clicked && <MobileCategoryDropDown slug={slug} parent={title}  />}
    </div>
  );
}

export default memo(MobileCategoryTabs);
