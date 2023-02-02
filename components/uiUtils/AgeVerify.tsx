import { memo, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { ButtonPrimary } from "@uiUtils";
import Placeholder from "../../assets/images/vector-4.svg";
import { useDimensions } from "@hooks";

function AgeVerify() {
  const [dimensions] = useDimensions();
  const [adult, setAdult] = useState<boolean>(null);

  useEffect(() => {
    const isExist = localStorage.getItem("ageVerify");

    if (!isExist?.toString()?.length) {
      setAdult(false);
      return;
    }
    setAdult(true);
  }, []);

  const handleClickVerify = useCallback(() => {
    localStorage.setItem("ageVerify", "true");
    setAdult(true);
  }, []);

  const handleClose = useCallback(() => {
    window.location.assign("https://www.google.com/");
  }, []);

  return (
    <>
      <AnimatePresence>
        {adult === false ? (
          <motion.div
            initial={{
              opacity: 0,
              scale: "50%",
            }}
            animate={{
              opacity: 1,
              scale: "100%",
            }}
            exit={{
              opacity: 0,
              scale: "150%",
            }}
            transition={{
              type: "keyframes",
            }}
            className="w-full h-full absolute z-[999999] flex items-center justify-center"
          >
            <div
              id="product-popup"
              className="absolute w-[20rem] sm:w-[30rem] h-[35rem] rounded-md bg-backgroundColorSecondary z-[999999] p-4 px-9 flex flex-col items-center"
            >
              <div className="w-80 h-80 relative">
                <Image src={Placeholder} fill alt="logo" />
              </div>

              <div className="w-full flex flex-col gap-4 items-start py-10 pb-14">
                <h2 className="text-base font-primary font-semibold text-primaryText">
                  Are you 18 plus yet?
                </h2>
                <p className="text-justify text-sx w-[95%] text-primaryText font-primary">
                  The products available on Day2day Wholesale are{" "}
                  <b>
                    age-restricted and intended for adults of legal smoking age
                    only.
                  </b>{" "}
                  By Entering our website, you affirm that you are of legal
                  smoking age in your jurisdiction and you agree to be Age
                  Verified.
                </p>
              </div>

              <div className="w-full flex items-center gap-2 justify-center  ">
                <ButtonPrimary
                  onClick={handleClickVerify}
                  title="YES IM LEGAL AGE"
                  style={{
                    color: "white",
                    width: "50%",
                    fontSize: dimensions?.width < 500 ? 10 : 14

                  }}
                />
                <ButtonPrimary
                  title="NO I DON'T AGREE"
                  varaint="secondary"
                  onClick={handleClose}
                  style={{
                    width: "50%",
                    fontSize: dimensions?.width < 500 ? 10 : 14,
                  }}
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default memo(AgeVerify);
