import React from "react";

import Sidebar from "./Sidebar";
import Category from "./Category";
import { useDimensions } from "@hooks";

export default function Main() {
  const [dimensions] = useDimensions();

  return (
    <>
      {dimensions?.width > 600 ? <Sidebar /> : null}
      <Category />
    </>
  );
}
