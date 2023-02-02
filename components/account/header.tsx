import { memo, useContext } from "react";
import Image from "next/image";

import Placeholder from "../../assets/images/checkout-banner.jpg";
import { UserContext } from "@context";

function Header() {
  const { user } = useContext(UserContext);
  return (
    <div className="w-full h-[25rem] relative">
      <div className="w-full z-[9] h-full absolute bg-black/50 text-white font-semibold font-primary text-sx items-center justify-center flex flex-col">
        <h2 className=" font-fashion text-[30px]">hello</h2>
        <h2 className=" font-primary text-base">{user?.name}</h2>
      </div>
      <Image
        src={Placeholder}
        fill
        alt="placeholder"
        className="object-cover"
        unoptimized
      />
    </div>
  );
}

export default memo(Header);
