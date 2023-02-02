import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ButtonPrimary, InputLabel } from "@uiUtils";

const CheckoutForm = ({ handleClose, price, placeOrder }: any): JSX.Element => {
  const Router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [stripeLoaded, setStripeLoaded] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const btnsRef = useRef<any>(null);

  useEffect(() => {
    if (stripeLoaded) {
      btnsRef?.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [stripeLoaded]);

  useEffect(() => {
    let tid: any;

    if (tid) {
      clearTimeout(tid);
    }

    tid = setTimeout(() => {
      setStripeLoaded(true);
      //@ts-ignore
    }, 2000);

    return () => {
      clearTimeout(tid);
    };
  }, []);

  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    const res = await stripe.confirmPayment({
      elements,

      confirmParams: {
        return_url:
          process?.env?.NODE_ENV === "development"
            ? "http://localhost:3000/checkout/success"
            : "https://social-theta-eight.vercel.app/payment/success",
        payment_method_data: {},
      },
      redirect: "if_required",
    });

    const { error } = res;

    if (!error?.type) {
      await placeOrder(
        res?.paymentIntent?.id,
        res?.paymentIntent?.payment_method_types[0],
        res?.paymentIntent?.amount
      );
      
      handleClose();
      setLoading(false);
    }

    //@ts-ignore
    if (error?.type === "card_error" || error?.type === "validation_error") {
      //@ts-ignore
      setMessage(error.message);
      setLoading(false);
      return;
    } else {
      setMessage("An unexpected error occurred.");
      setLoading(false);
      return;
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="w-full">
      <PaymentElement id="payment-element" />
      {stripeLoaded && (
        <div className="w-full items-center flex  mt-4 flex-col gap-10 pb-10">
          <div className="w-full flex flex-col gap-4 bg-[#F1F1F1] py-5 rounded-xl px-4">
            <span className="text-sx font-primary font-semibold text-primaryText/60">
              Amount Payable
            </span>
            <span className="text-sx font-primary font-semibold text-primaryText/80 -mt-4">
              ${price?.toFixed(2)}
            </span>
          </div>
          <div
            ref={btnsRef}
            className="w-full flex gap-4 items-center justify-center"
          >
            <ButtonPrimary
              loading={loading}
              onClick={handleSubmit}
              title="Pay Now"
              style={{ color: "white" }}
            />
            <ButtonPrimary
              onClick={handleClose}
              varaint="secondary"
              title="Close"
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
