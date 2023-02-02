import Head from "next/head";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";

const DynamicCategoryCom = dynamic(
  () => import("../../../components/Category/index"),
  {
    ssr: true,
    suspense: true,
  }
);

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>
          {router?.query?.category
            ?.toString()
            ?.toUpperCase()
            ?.split("-")
            ?.join(" ")}
          | Day2Day
        </title>
        <meta
          name="description"
          content={
            "Find your love products in " +
            router?.query?.category
              ?.toString()
              ?.toUpperCase()
              ?.split("-")
              ?.join(" ") +
            " By Day2daywholesale"
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="day2daywholesale.co" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:locale" content="en_US" />
        <meta
          property="og:title"
          content={
            router?.query?.category
              ?.toString()
              ?.toUpperCase()
              ?.split("-")
              ?.join(" ") + " By Day2daywholesale"
          }
          key="title"
        />
      </Head>

      <div className="w-screen h-screen flex flex-row px-sides">
        <DynamicCategoryCom />
      </div>
    </div>
  );
}
