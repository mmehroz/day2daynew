import { memo } from "react";

function Loader(): JSX.Element {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-tr from-main to-mainSecondary items-center justify-center">
      <div className=" w-[70%] 2xl:w-[50%] h-[98%] rounded-lg bg-white  flex flex-col py-6 overflow-y-scroll hidescrollbar">
        <div className="flex items-center w-[90%] px-4 gap-2">
          <div className="w-40 h-40 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="flex flex-col items-start w-[80%] gap-4">
            <h2 className="bg-gray-300 animate-pulse h-4 rounded-md w-[80%] " />
            <h2 className="bg-gray-300 animate-pulse h-4 rounded-md w-[50%] " />
          </div>
        </div>
        <div className="w-full px-10 flex justify-between items-center mt-6">
          <div className="flex flex-col relative">
            <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse" />
          </div>
          <div className="border-b w-full h-2" />
          <div className="flex flex-col relative">
            <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse" />
          </div>
          <div className="border-b w-full h-2" />
          <div className="flex flex-col relative">
            <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse" />
          </div>
        </div>
        <div className="w-full flex items-center px-8 mt-20 justify-between">
          <div className="flex gap-10 items-center">
            <h2 className="w-32 h-4 rounded-full bg-gray-300 animate-pulse" />
            <h2 className="w-10 h-4 rounded-full bg-gray-300 animate-pulse" />
          </div>
          <div className="flex gap-10 items-center">
            <h2 className="w-20 h-4 rounded-full bg-gray-300 animate-pulse" />
            <h2 className="w-24 h-4 rounded-full bg-gray-300 animate-pulse" />
          </div>
        </div>
        <div className="flex flex-col h-96 w-full px-8 mt-10 gap-4 overflow-y-scroll border-b border-dashed border-primaryText">
          <div className="w-full flex p-4 rounded-lg items-center justify-between  cursor-pointer hover:bg-gray-100 transition duration-100 px-2 pr-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-lg relative bg-gray-300 animate-pulse" />
              <div className="flex flex-col w-96 gap-2">
                <h2 className="w-60 h-3 rounded-full animate-pulse bg-gray-300" />
                <h2 className="w-20 h-3 rounded-full animate-pulse bg-gray-300" />
                <h2 className="w-40 h-3 rounded-full animate-pulse bg-gray-300" />
              </div>
            </div>
            <div className="flex items-center font-semibold text-primaryText font-primary text-sx">
              <h2 className="w-10 h-2 rounded-full bg-gray-300 animate-pulse" />
            </div>
            <div className="flex flex-col items-center font-bold text-primaryText font-primary text-sx gap-2">
              <h2 className="w-20 h-2 rounded-full bg-gray-300 animate-pulse" />
              <h2 className="w-20 h-2 rounded-full bg-gray-300 animate-pulse" />
            </div>
          </div>
          <div className="w-full flex p-4 rounded-lg items-center justify-between  cursor-pointer hover:bg-gray-100 transition duration-100 px-2 pr-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-lg relative bg-gray-300 animate-pulse" />
              <div className="flex flex-col w-96 gap-2">
                <h2 className="w-60 h-3 rounded-full animate-pulse bg-gray-300" />
                <h2 className="w-20 h-3 rounded-full animate-pulse bg-gray-300" />
                <h2 className="w-40 h-3 rounded-full animate-pulse bg-gray-300" />
              </div>
            </div>
            <div className="flex items-center font-semibold text-primaryText font-primary text-sx">
              <h2 className="w-10 h-2 rounded-full bg-gray-300 animate-pulse" />
            </div>
            <div className="flex flex-col items-center font-bold text-primaryText font-primary text-sx gap-2">
              <h2 className="w-20 h-2 rounded-full bg-gray-300 animate-pulse" />
              <h2 className="w-20 h-2 rounded-full bg-gray-300 animate-pulse" />
            </div>
          </div>
          <div className="w-full flex p-4 rounded-lg items-center justify-between  cursor-pointer hover:bg-gray-100 transition duration-100 px-2 pr-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-lg relative bg-gray-300 animate-pulse" />
              <div className="flex flex-col w-96 gap-2">
                <h2 className="w-60 h-3 rounded-full animate-pulse bg-gray-300" />
                <h2 className="w-20 h-3 rounded-full animate-pulse bg-gray-300" />
                <h2 className="w-40 h-3 rounded-full animate-pulse bg-gray-300" />
              </div>
            </div>
            <div className="flex items-center font-semibold text-primaryText font-primary text-sx">
              <h2 className="w-10 h-2 rounded-full bg-gray-300 animate-pulse" />
            </div>
            <div className="flex flex-col items-center font-bold text-primaryText font-primary text-sx gap-2">
              <h2 className="w-20 h-2 rounded-full bg-gray-300 animate-pulse" />
              <h2 className="w-20 h-2 rounded-full bg-gray-300 animate-pulse" />
            </div>
          </div>
          <div className="w-full flex p-4 rounded-lg items-center justify-between  cursor-pointer hover:bg-gray-100 transition duration-100 px-2 pr-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-lg relative bg-gray-300 animate-pulse" />
              <div className="flex flex-col w-96 gap-2">
                <h2 className="w-60 h-3 rounded-full animate-pulse bg-gray-300" />
                <h2 className="w-20 h-3 rounded-full animate-pulse bg-gray-300" />
                <h2 className="w-40 h-3 rounded-full animate-pulse bg-gray-300" />
              </div>
            </div>
            <div className="flex items-center font-semibold text-primaryText font-primary text-sx">
              <h2 className="w-10 h-2 rounded-full bg-gray-300 animate-pulse" />
            </div>
            <div className="flex flex-col items-center font-bold text-primaryText font-primary text-sx gap-2">
              <h2 className="w-20 h-2 rounded-full bg-gray-300 animate-pulse" />
              <h2 className="w-20 h-2 rounded-full bg-gray-300 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Loader);
