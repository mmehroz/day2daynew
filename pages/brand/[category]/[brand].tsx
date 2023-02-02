import Head from "next/head";

import { CategoryComp } from "@components";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Day2Day</title>
        <meta name="description" content="day2day" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen flex flex-row px-sides">
        <CategoryComp />
      </div>
    </div>
  );
}
