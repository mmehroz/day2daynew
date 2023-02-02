import { GetServerSideProps,  } from "next";
import { gql } from "@apollo/client";
import apolloClient from "../../lib/apollo";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import Head from "next/head";
import type { ProductPageProps } from "@types";

const DynamicProduct = dynamic(() => import("../../components/product/index"), {
  ssr: true,
  suspense: true,
});

export default function Page({ product }: ProductPageProps) {
  return (
    <div>
      <Head>
        <title>{product?.name} | Day2Day</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content={product?.name} />
        <meta name="description" content={product?.short_description} />
        <meta name="image" content={product?.imageURI} />
        <meta name="robots" content="index, follow" />
        <meta property="og:image" content={product?.imageURI} />
        <meta property="og:title" content={product?.name} key="title" />
        <meta property="og:description" content={product?.short_description} />
        <meta property="og:site_name" content="day2day.co" />
        <meta property="og:locale" content="en-US" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="w-screen h-screen overflow-y-scroll">
        <Suspense fallback={`loading product`}>
          <DynamicProduct product={product} />
        </Suspense>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        product(slug: "${context?.query?.slug}") {
          slug
          name
          imageURI
          short_description
        }
      }
    `,
  });

  return {
    props: {
      product: data?.product,
    },
  };
};
