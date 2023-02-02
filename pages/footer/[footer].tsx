import { GetServerSideProps, NextPage } from "next";
import { gql } from "@apollo/client";
import apolloClient from "../../lib/apollo";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import Head from "next/head";
import { FooterContent } from "@types";

const DynamicCheckout = dynamic(
  () => import("../../components/Footer/content"),
  {
    ssr: true,
    suspense: true,
  }
);

export default function Page({ content }: { content: FooterContent }) {
  return (
    <div>
      <Head>
        <title>{content?.title} | Day2Day Wholesale</title>
        <meta
          name="description"
          content={`Day2Day ${content?.title} | ${content?.type}`}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content={content?.title} />
        <meta
          property="og:title"
          content={`Day2Day ${content?.title} | ${content?.type}`}
          key="title"
        />
        <meta property="og:locale" content="en_IE" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="day2day.co" />
        <meta property="og:url" content="https://day2daywholesale.com" />
        <meta
          property="og:description"
          content="Day2Day is an online retailer and wholesaler website we provide our customer with top notch product quality and prices."
        />
      </Head>
      <div className="flex flex-col h-screen w-screen overflow-y-scroll overflow-x-hidden">
        <Suspense fallback="Loading checkout">
          <DynamicCheckout {...content} />
        </Suspense>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log(context?.query?.footer);
  const { data, error, loading } = await apolloClient.query({
    query: gql`
      query {
        individualContent(slug: "${context?.query?.footer}") {
          slug
          title
          imageURI
          content
          type
        }
      }
    `,
  });

  // console.log(data);
  // console.log("data");

  return {
    props: {
      content: data?.individualContent,
    },
  };
};
