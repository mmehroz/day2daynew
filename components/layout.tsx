import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ProductPopupContext } from "@context";
import { ProductPopup } from "@uiUtils";

const DynamicHeader = dynamic(() => import("./header"));

const DynamicCart = dynamic(() => import("./cart"), {
  suspense: true,
});

const DynamicSearch = dynamic(() => import("./uiUtils/Search"), {
  suspense: true,
});

const DynamicModal = dynamic(() => import("./uiUtils/Modal"), {
  suspense: true,
});

const DynamicLogin = dynamic(() => import("./auth/login"), {
  suspense: true,
});

const DynamicMobileMenu = dynamic(() => import("./uiUtils/MobileMenu"), {
  suspense: true,
});

const DynamicMobileAccountSidebar = dynamic(
  () => import("./account/MobileSidebar"),
  {
    suspense: true,
  }
);

const DynamicAgePopup = dynamic(() => import("./uiUtils/AgeVerify"), {
  suspense: true,
});

const DynamicMobileCategorySidebar = dynamic(
  () => import("./Category/MobileSidebar"),
  {
    suspense: true,
  }
);

interface Props {
  children: any;
}

export default function Layout({ children }: Props): JSX.Element {
  const { showPopup } = useContext(ProductPopupContext);

  return (
    <>
      <Suspense fallback={`Header Loading..`}>
        <DynamicHeader />
      </Suspense>
      <Suspense fallback={"Cart Loading"}>
        <DynamicCart />
      </Suspense>
      <Suspense fallback="loading login..">
        <DynamicLogin />
      </Suspense>

      <Suspense fallback="loading search">
        <DynamicSearch />
      </Suspense>

      <Suspense fallback="loading modal">
        <DynamicModal />
      </Suspense>

      {/* Mobile Component NO DATAFETCHING  */}
      <Suspense fallback="Loading Mobile Menu Sidebar">
        <DynamicMobileMenu />
      </Suspense>

      {/* Mobile Component NO DATAFETCHING  */}
      <Suspense fallback="Loading Mobile Account Sidebar">
        <DynamicMobileAccountSidebar />
      </Suspense>

      {/* Mobile Component NO DATAFETCHING  */}
      <Suspense fallback="Loading Mobile Sidebar Category">
        <DynamicMobileCategorySidebar />
      </Suspense>

      <Suspense fallback="loading age popup">
        <DynamicAgePopup />
      </Suspense>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{
              opacity: 0,
              scale: "200%",
            }}
            animate={{
              opacity: 1,
              scale: "100%",
            }}
            exit={{
              opacity: 0,
              scale: "130%",
            }}
            transition={{
              type: "keyframes",
            }}
            id="product-popup"
            className="w-[60%] 2xl:w-[50%] h-[70%] 2xl:h-[65%]  absolute bg-backgroundColorSecondary rounded-xl z-[9999999] top-[17%] left-[20%] 2xl:left-[27%] flex "
          >
            <ProductPopup />
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
