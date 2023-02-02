import React, { useState, memo } from "react";
import { Range } from "react-range";
import formatter from "format-number";
import ButtonPrimary from "./ButtonPrimary";
import Link from "next/link";
import { useRouter } from "next/router";

const MIN = 0;
const MAX = 1000;
const STEP = 10;

function Slider(): JSX.Element {
  const [values, setValues] = useState<any>([10, 1000]);
  const router = useRouter();

  const setPath = () => {
    // console.log(router);
    let uri = router?.asPath;

    if (router?.asPath?.includes("?")) {
      uri = router?.asPath?.toString()?.split("?")[0];
    }

    return `${uri}?min=${values[0]}&max=${values[1]}`;
  };

  return (
    <React.Fragment>
      <div className="flex flex-col pl-2 gap-10 mt-5">
        <Range
          step={STEP}
          min={MIN}
          max={MAX}
          values={values}
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                backgroundColor: "#d8e0f3",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, isDragged, index }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "15px",
                width: "15px",
                backgroundColor: `${isDragged ? "#f67732" : "#fff"}`,
                borderRadius: "100%",
                border: "2px solid #f67732",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {isDragged && (
                <div className="px-2 h-5 bg-gradient-to-tr from-main to-mainSecondary rounded-md absolute -top-6 flex items-center justify-center text-xs text-white font-medium">
                  <h2 className="text-center">{formatter()(values[index])}</h2>
                </div>
              )}
            </div>
          )}
        />
        <div className="w-full flex items-center justify-center text-black/80 gap-4 backdrop:font-primary">
          <div className="border w-[50%] h-10 flex border-secondary rounded-md text-secondary font-medium">
            <div className="px-2 flex items-center h-full text-sx">
              <h2>$</h2>
            </div>
            <div className="w-1 h-full border-l border-secondary " />
            <div
              className="px-2 flex items-center h-full text-sx justify-center w-full font-semibold
            "
            >
              <h2>{formatter()(values[0])}</h2>
            </div>
          </div>
          <h2 className="font-medium">-</h2>
          <div className="border w-[50%] h-10 flex border-secondary  rounded-md text-secondary font-medium">
            <div className="px-2 flex items-center h-full text-sx">
              <h2>$</h2>
            </div>
            <div className="w-1 h-full border-l border-secondary " />
            <div className="px-2 flex items-center h-full text-sx  justify-center w-full font-semibold">
              <h2>{formatter()(values[1])}</h2>
            </div>
          </div>
        </div>
      </div>
      <Link passHref href={setPath()}>
        <ButtonPrimary
          title="Search"
          style={{ color: "white", width: "100%" }}
        />
      </Link>
    </React.Fragment>
  );
}

export default memo(Slider);
