import { memo } from "react";

interface props {
  width?: string;
}

function LoadingCardPrimary({ width }: props): JSX.Element {
  return (
    <div
      style={{
        width,
      }}
      className="card-secondary gap-6 mb-2 pb-2"
    >
      <div className="h-[75%]  bg-gray-200 animate-pulse w-full rounded-xl relative cursor-pointer "></div>
      <div className="w-full flex flex-col items-start px-2">
        <h2 className="text-primaryText/90 font-primary font-semibold">
          <div className="w-40 h-4 rounded-full bg-gray-200 animate-pulse " />
        </h2>
        <h2 className="text-primaryText/90 font-primary text-xs mt-2">
          <div className="w-32 h-3 rounded-full bg-gray-200 animate-pulse " />
        </h2>
        <div className="w-full flex items-start mt-2 gap-2 mb-2">
          <h2 className="font-semibold font-primary text-base text-red-500"></h2>
          <h2 className="font- line-through font-primary text-base text-red-500/80"></h2>
        </div>
      </div>
    </div>
  );
}

export default memo(LoadingCardPrimary);
