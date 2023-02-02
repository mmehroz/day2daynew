import { Suspense, useContext, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const DynamicAccount = dynamic(() => import("../../components/account"), {
  ssr: true,
  suspense: true,
});

export default function Page() {
  return (
    <div>
      <Head>
        <title>Account | Day2Day</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Account | Day2Day" />
        <meta name="description" content="User account day2day whole sale" />
      </Head>
      <div className="flex flex-col h-screen w-screen overflow-y-scroll overflow-x-hidden gap-20">
        <Suspense fallback="account loading..">
          <DynamicAccount />
        </Suspense>
      </div>
    </div>
  );
}
