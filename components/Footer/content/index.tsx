import type { FooterContent } from "@types";
import Image from "next/image";
import Link from "next/link";
import Footer from "..";

export default function Content({
  title,
  imageURI,
  type,
  content,
}: FooterContent) {
  return (
    <>
      <div className="w-full flex flex-col mt-10 sm:mt-24 py-8 gap-8 mb-40">
        <div className="w-full h-96 2xl:h-[20rem] relative">
          <div className="w-full h-full z-[9] absolute bg-black/60 flex items-center justify-center text-white font-bold font-fashion text-[30px]">
            <h2>{title}</h2>
          </div>
          <Image
            unoptimized
            fill
            className="object-cover"
            src={imageURI}
            alt={title}
          />
        </div>
        <div id="footer-page-dynamic" className="px-40 pt-20">
          <div className="p-10 flex flex-col rounded-xl bg-gradient-to-tr from-main to-mainSecondary text-white font-primary text-base">
            <p
              className="gap-2"
              dangerouslySetInnerHTML={{ __html: content }}
            ></p>
            <Link passHref href="/">
              <p className="mt-10 font-bold font-fashion text-right cursor-pointer">
                Day2DayWholesale
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
