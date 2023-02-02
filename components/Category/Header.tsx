import { memo } from "react";

function Header(): JSX.Element {
  return (
    <div className="w-full flex gap-2 items-center text-primaryText/60 font-medium font-primary text-sx">
      <h2 className="hover:text-primaryText cursor-pointer">Home</h2>
      <h2>/</h2>
      <h2 className="hover:text-primaryText cursor-pointer">Category</h2>
      <h2>/</h2>
      <h2 className="hover:text-primaryText cursor-pointer">Devices</h2>
    </div>
  );
}

export default memo(Header);
