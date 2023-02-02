import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useLazyQuery } from "@apollo/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { FiShoppingBag, FiTruck } from "react-icons/fi";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BsBox } from "react-icons/bs";

import { queries } from "@queries";
import { OrdersDataProps } from "@types";
import Product from "./Product";

import Placeholder from "../../assets/images/vector-1.svg";
import Loader from "./Loader";
import { ButtonPrimary } from "@uiUtils";
import Link from "next/link";

export default function Order(): JSX.Element {
  const router = useRouter();

  const [fetchOrderDetails, { loading, data }] = useLazyQuery(
    queries?.fetchOrderDetails,
    {
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-only",
    }
  );

  const [order, setOrder] = useState<OrdersDataProps>(null);

  const memoizeOrder = useMemo(() => order, [order]);

  useEffect(() => {
    if (!router?.query?.order) return;

    fetchOrderDetails({
      variables: {
        singleOrderId: router?.query?.order,
      },
    });
  }, [router?.query]);

  useEffect(() => {
    setOrder(data?.singleOrder);
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  const handlePDF = () => {
    const page = document.getElementById("report");
    html2canvas(page, {
      allowTaint: true,
      scale: 3,
      useCORS: true,
      height: window.outerHeight + window.innerHeight + 100,
      windowHeight: window.outerHeight + window.innerHeight + 100,
      width: 1000,
    }).then((canva) => {
      const img = canva.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        format: [800, window.outerHeight + window.innerHeight],
        compress: true,
      });

      //@ts-ignore
      pdf.addImage(img, "JPEG", 0, 0);
      pdf.save("reciept.pdf");
    });
  };

  function getBack(): string {
    return router?.asPath?.split(router?.query?.order?.toString())?.join("");
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-tr from-main to-mainSecondary items-center justify-center">
      <div className="flex justify-end absolute top-10 left-12">
        <div className="flex gap-2 items-center z-[999]">
          <Link passHref href={"/account/orders"}>
            <div className="w-10 h-10 rounded-full bg-white items-center justify-center flex text-orange-500 hover:scale-110 transition duration-150 cursor-pointer">
              <MdOutlineArrowBackIosNew />
            </div>
          </Link>
          <h2 className="text-white text-sx font-semibold font-primary">
            Back to website
          </h2>
        </div>
      </div>
      <div className="w-full flex justify-end absolute top-10 right-12">
        <ButtonPrimary title="Download" varaint="white" onClick={handlePDF} />
      </div>
      <div
        id="report"
        className=" w-[70%] 2xl:w-[50%] h-[98%] rounded-lg bg-white flex flex-col py-6 overflow-y-scroll hidescrollbar relative"
      >
        {memoizeOrder?.order_status === "CANCELLED" ? (
          <div className="w-full h-full absolute items-center justify-center z-[99] flex">
            <div className="p-4 -rotate-45  rounded-lg border-red-500 border-2">
              <h2 className="text-[52px] uppercase text-red-500 font-primary font-bold ">
                Cancelled
              </h2>
            </div>
          </div>
        ) : null}
        <div className="w-full flex items-center flex-col gap-2">
          <div className="flex items-center w-[90%]">
            <div className="w-40 h-40 relative">
              <Image
                src={
                  "https://firebasestorage.googleapis.com/v0/b/day2day-25451.appspot.com/o/svgs%2FVector_01.jpg?alt=media&token=ed54b6ce-e4db-4739-9dcd-37077edfa45e"
                }
                alt="reciept-placeholder"
                fill
                className="object-contain"
                unoptimized
                crossOrigin="anonymous"
              />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-sx font-primary font-semibold text-black/80 ">
                Hi{" "}
                {`${memoizeOrder?.Address?.firstName} ${memoizeOrder?.Address?.lastName}`}
                , we have received your order and are getting it ready to be
                shipped.
              </h2>
              <h2 className="text-sx font-primary font-semibold text-black/80 ">
                We will notify you when {"it's"} on its way!
              </h2>
            </div>
          </div>

          <div className="w-[80%] flex justify-between items-center mt-6">
            <div className="flex flex-col relative">
              <div
                className={`w-16 h-16 rounded-full ${
                  memoizeOrder?.order_status === "PROCESSING"
                    ? "bg-mainSecondary text-white"
                    : "bg-gray-200 text-gray-400"
                } flex items-center justify-center text-[30px]`}
              >
                <FiShoppingBag />
              </div>
              <div
                className={`absolute -bottom-10 -left-4 uppercase text-sx font-bold font-primary ${
                  memoizeOrder?.order_status === "PROCESSING"
                    ? "text-mainSecondary"
                    : "text-primaryText/60"
                }`}
              >
                <h2>Processing</h2>
              </div>
            </div>
            <div className="border-b w-full h-2" />
            <div className="flex flex-col relative">
              <div
                className={`w-16 h-16 rounded-full  ${
                  memoizeOrder?.order_status === "SHIPPED"
                    ? "bg-mainSecondary text-white"
                    : "bg-gray-200 text-gray-400"
                } flex items-center justify-center text-[30px]`}
              >
                <FiTruck />
              </div>
              <div
                className={`absolute -bottom-10 left-1 uppercase text-sx font-bold font-primary ${
                  memoizeOrder?.order_status === "SHIPPED"
                    ? "text-mainSecondary"
                    : "text-primaryText/60"
                }`}
              >
                <h2>SHIPPED</h2>
              </div>
            </div>
            <div className="border-b w-full h-2" />
            <div className="flex flex-col relative">
              <div
                className={`w-16 h-16 rounded-full ${
                  memoizeOrder?.order_status === "COMPLETED"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
                } flex items-center justify-center text-[30px]`}
              >
                <BsBox />
              </div>
              <div
                className={`absolute -bottom-10 -left-2 uppercase text-sx font-bold font-primary ${
                  memoizeOrder?.order_status === "COMPLETED"
                    ? "text-green-500"
                    : "text-primaryText/60"
                }`}
              >
                <h2>COMPLETED</h2>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center px-8 mt-20 justify-between">
            <div className="flex gap-10 items-center">
              <h2 className="font-bold text-sx font-primary text-primaryText">
                Order No
              </h2>
              <h2 className="font-semibold text-sx font-primary text-primaryText">
                #{memoizeOrder?.order_id}
              </h2>
            </div>
            <div className="flex gap-10 items-center">
              <h2 className="font-bold text-sx font-primary text-primaryText">
                Order Date
              </h2>
              <h2 className="font-semibold text-sx font-primary text-primaryText">
                {new Date(parseInt(memoizeOrder?.createdAt)).toDateString()}
              </h2>
            </div>
          </div>

          <div className="flex flex-col pb-10 w-full px-8 mt-10 gap-4 overflow-y-scroll border-b border-dashed border-primaryText">
            {memoizeOrder?.orderProducts?.map((el, i) => (
              <Product {...el} key={i} />
            ))}
          </div>
          <div className="w-full flex justify-between px-8 py-4">
            <div className="flex flex-col gap-6">
              <h2 className="font-md font-primary font-bold text-primaryText">
                Payment & Shipping details
              </h2>
              <div className="flex flex-col gap-2">
                <div className="flex gap-16 text-sx font-primary text-primaryText">
                  <h2 className="font-bold w-32">Delivered to</h2>
                  <h2 className="font-semibold text-primaryText/80">
                    {`${memoizeOrder?.Address?.firstName} ${memoizeOrder?.Address?.lastName}`}
                  </h2>
                </div>
                <div className="flex gap-16 text-sx font-primary text-primaryText">
                  <h2 className="font-bold w-32">Delivery Address</h2>
                  <h2 className="font-semibold text-primaryText/80">
                    {`${memoizeOrder?.Address?.address}`}
                  </h2>
                </div>
                <div className="flex gap-16 text-sx font-primary text-primaryText">
                  <h2 className="font-bold w-32">Transaction ID</h2>
                  <h2 className="font-semibold text-primaryText/80">
                    {`${memoizeOrder?.traction_id}`}
                  </h2>
                </div>
                <div className="flex gap-16 text-sx font-primary text-primaryText">
                  <h2 className="font-bold w-32">Shipping ID</h2>
                  <h2 className="font-semibold text-primaryText/80">NA</h2>
                </div>
              </div>
            </div>
            <div className="p-4 px-6 rounded-lg bg-mainSecondary/20 flex flex-col justify-between">
              <div className="flex gap-16 text-sx font-primary text-primaryText">
                <h2 className="font-bold w-32">Subtotal</h2>
                <h2 className="font-semibold text-primaryText/80">
                  $
                  {parseInt(
                    memoizeOrder?.subtotal
                      ?.toString()
                      ?.slice(0, memoizeOrder?.subtotal?.toString()?.length - 2)
                  ).toFixed(2)}
                </h2>
              </div>
              <div className="flex gap-16 text-sx font-primary text-primaryText">
                <h2 className="font-bold w-32">Shipping Fee</h2>
                <h2 className="font-semibold text-primaryText/80">$2.00</h2>
              </div>
              <div className="flex gap-16 text-sx font-primary text-mainSecondary">
                <h2 className="font-bold w-32">Total</h2>
                <h2 className="font-semibold text-mainSecondary/80">
                  $
                  {(
                    parseInt(
                      memoizeOrder?.subtotal
                        ?.toString()
                        ?.slice(
                          0,
                          memoizeOrder?.subtotal?.toString()?.length - 2
                        )
                    ) + 2
                  )?.toFixed(2)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
