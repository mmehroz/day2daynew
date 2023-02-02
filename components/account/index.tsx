import { useState, useEffect, useContext } from "react";

import Sidebar from "./Sidebar";
import Header from "./header";
import Content from "./Content";
import { UserContext } from "@context";
import { useRouter } from "next/router";

export default function Account(): JSX.Element {
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.isExists === false) {
      router?.push("/");
    }
  }, [user.isExists]);

  if (user?.isExists === null || user?.isExists === false) {
    return <></>;
  }

  return (
    <div className="w-full flex flex-col mt-20 sm:mt-32 bg-background">
      <Header />
      <div className="w-full flex pt-20 px-sides pb-20">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}
