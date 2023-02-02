import dynamic from "next/dynamic";
import { Suspense } from "react";

import Head from "next/head";

const DynamicCheckout = dynamic(
  () => import("../../components/checkout/index"),
  {
    ssr: true,
    suspense: true,
  }
);

export default function Page() {
  return (
    <div>
      <Head>
        <title>Checkout | Day2Day Wholesale</title>
        <meta name="description" content="day2day checkout" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content={"checkout"} />
        <meta name="description" content={"checkout"} />
      </Head>
      <div className="flex flex-col h-screen w-screen overflow-y-scroll overflow-x-hidden">
        <Suspense fallback="Loading checkout">
          <DynamicCheckout />
        </Suspense>
      </div>
    </div>
  );
}
