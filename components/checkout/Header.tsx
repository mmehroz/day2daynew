import { memo, useContext } from "react";
import Image from "next/image";

import Placeholder from "../../assets/images/checkout-banner.jpg";
import { UserContext } from "@context";

function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full h-[28rem] flex relative">
      <div className="w-full h-full bg-black/60 absolute flex items-center justify-center">
        <div className="flex flex-col items-center">
          <h2 className="text-white text-[40px] font-semibold  font-fashion ">
            hello
          </h2>
          <h2 className="text-white text-md font-bold font-primary -mt-2">
            {user?.name}
          </h2>
        </div>
      </div>
      <Image
        src={Placeholder}
        alt="background-image-placeholder"
        className="object-cover"
        unoptimized
      />
    </div>
  );
}

export default memo(Header);
