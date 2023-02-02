import Head from "next/head";
import {
  Slider,
  SliderSecondary,
  BrowseCategory,
  FeaturedProducts,
  FlashSale,
  NewArrivals,
  Newsbar,
  Footer,
} from "@components";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Day2Day Wholesale</title>
        <meta charSet="utf-8" />
        <meta name="googlebot" content="index,follow" />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Day2Day Wholesale" />
        <meta
          name="description"
          content="Day2Day is an online retailer and wholesaler website we provide our customer with top notch product quality and prices."
        />
        <meta
          property="og:title"
          content="Day2Day Whole No.1 Vape market leading website."
          key="title"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="day2daywholesale.com" />
        <meta property="og:url" content="https://day2daywholesale.com" />
        <meta
          property="og:description"
          content="Day2Day is an online retailer and wholesaler website we provide our customer with top notch product quality and prices."
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/day2day-25451.appspot.com/o/svgs%2FVector_01.svg?alt=media&token=a99ce1ca-80e4-42fb-9407-10d670cea8e6"
        />
        <meta
          name="image"
          content="https://firebasestorage.googleapis.com/v0/b/day2day-25451.appspot.com/o/svgs%2FVector_01.svg?alt=media&token=a99ce1ca-80e4-42fb-9407-10d670cea8e6"
        />
      </Head>
      <div  className="flex flex-col h-screen w-screen overflow-y-scroll overflow-x-hidden gap-20  px-sides hidescrollbarquery">
        <Slider />
        <SliderSecondary />
        <BrowseCategory />
        <FeaturedProducts />
        <FlashSale />
        <NewArrivals />
        <Newsbar />
        <Footer />
      </div>
    </div>
  );
}
