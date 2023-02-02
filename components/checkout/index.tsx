import { useState, useEffect, Suspense, useContext } from "react";
import dynamic from "next/dynamic";
import { Footer, Newsbar } from "@components";
import { UserContext } from "@context";
import { useRouter } from "next/router";

const DynamicForm = dynamic(() => import("./Form"), {
  suspense: true,
});
const DynamicOrders = dynamic(() => import("./Orders"), {
  suspense: true,
});
const DynamicHeader = dynamic(() => import("./Header"), {
  suspense: true,
});

export default function Checkout(): JSX.Element {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user?.isExists === false) {
      router?.push("/");
    }
  }, [user.isExists]);

  if (user?.isExists === null || user?.isExists === false) {
    return <></>;
  }

  return (
    <div className="w-full h-full flex flex-col mt-20 sm:mt-32 text-black">
      <Suspense fallback="Loading header..">
        <DynamicHeader />
      </Suspense>
      <div className="w-full flex flex-col gap-10  sm:flex-row px-sides py-20 bg-backgroundColorSecondary ">
        <div className="w-full sm:w-[60%] flex flex-col h-full mr-20">
          <h2 className=" font-primary font-bold text-primaryText/80 text-[25px]">
            Shipping Address
          </h2>
          <Suspense fallback="form loading...">
            <DynamicForm />
          </Suspense>
        </div>
        <div className="w-full sm:w-1/2 flex flex-col h-full">
          <h2 className=" font-primary font-bold text-primaryText/80 text-[25px]">
            Your Order
          </h2>
          <Suspense fallback="orders loading...">
            <DynamicOrders />
          </Suspense>
        </div>
      </div>
      <div className="px-sides flex bg-backgroundColorSecondary mb-20">
        <Newsbar />
      </div>
      <div className="mt-10" />
      <Footer />
    </div>
  );
}
