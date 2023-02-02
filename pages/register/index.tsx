import Head from "next/head";
import dynamic from "next/dynamic";

import { Register } from "@components";

const DynamicRegister = dynamic(() => import("../../components/auth/register"))

export default function page() {
  return (
    <div>
      <Head>
        <title>Register | Day2Day</title>
        <meta name="description" content="day2day" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content={"Register With Day2Day"} />
        <meta
          name="description"
          content={
            "Register with us to keep up to date and get additional discounts"
          }
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={"Register day2day"} key="title" />
      </Head>
      <div className="w-screen h-screen overflow-y-scroll">
        <DynamicRegister />
      </div>
    </div>
  );
}

//changes
