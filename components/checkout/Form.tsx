import {
  memo,
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
  useContext,
  useEffect,
} from "react";
import memoize from "fast-memoize";
import { Elements } from "@stripe/react-stripe-js";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

import { ButtonPrimary, InputLabel, Logo } from "@uiUtils";
import { CheckoutProps, CheckoutPropsError } from "@types";
import StripeForm from "./StripeForm";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext, UiConext, UserContext } from "@context";
import { useLazyQuery, useMutation } from "@apollo/client";
import { queries } from "@queries";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  "pk_test_51LlCssCVRAHAPBm9moh5aAbTUwjSTPLBzLS7YzORjpqZNsgqegAsBfGbQEDJRJT9DwooY66Peu1O7TYA4oDJowJt00ncXw0GvS"
);

function Form(): JSX.Element {
  //@contexts
  const router = useRouter();
  const { product, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { showModal } = useContext(UiConext);

  // @queries
  const [createAddress] = useMutation(queries?.createAddres);
  const [getAddress] = useLazyQuery(queries.getAddress);
  const [fetchUserAddress, { data: userAddressData }] = useLazyQuery(
    queries.userAddress
  );

  const [createOrders] = useMutation(queries.createOrder);
  const [updateAddress] = useMutation(queries.updateAddress);
  const [createProductOrder] = useMutation(queries.createOrderProduct);

  //@states
  const [cred, setCred] = useState<CheckoutProps>({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    city: "",
    postcode: "",
  });
  const [credError, setCredError] = useState<CheckoutPropsError>({
    firstName: false,
    lastName: false,
    address: false,
    phone: false,
    email: false,
    city: false,
    postcode: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [clientSecret, setClientSecret] = useState("");
  const [showStripe, setShowStripe] = useState(false);

  //@memoizations
  const memoizeCred = useMemo(() => cred, [cred]);
  const memeoizeCredError = useMemo(() => credError, [credError]);
  const memoizeErrorMessage = useMemo(() => errorMessage, [errorMessage]);

  //@hooks
  useEffect(() => {
    if (!user?.email) return;

    fetchUserAddress({
      variables: {
        email: user?.email,
      },
    });
  }, [user?.email]);

  useEffect(() => {
    return setCred({
      address: userAddressData?.userAddress?.address,
      city: userAddressData?.userAddress?.city,
      firstName: userAddressData?.userAddress?.firstName,
      lastName: userAddressData?.userAddress?.lastName,
      postcode: userAddressData?.userAddress?.postCode,
      email: user?.email,
      phone: userAddressData?.userAddress?.number,
    });
  }, [userAddressData]);

  const handleCred = useCallback(
    memoize((type: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setCred({ ...cred, [type]: e.target.value });
    }),
    [memoizeCred]
  );

  const renderErrorMessage = useCallback(
    (type: string) => {
      if (memeoizeCredError[type]) {
        return memoizeErrorMessage;
      }
    },
    [memeoizeCredError, memoizeErrorMessage]
  );

  const handleError = (type: string | "clear") => {
    const def: CheckoutPropsError = {
      firstName: false,
      lastName: false,
      address: false,
      phone: false,
      email: false,
      city: false,
      postcode: false,
    };
    if (type === "clear") {
      setCredError({ ...def });
      return;
    }

    setCredError({ ...def, [type]: true });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      const fields = ["firstName", "lastName", "address", "phone", "email"];
      try {
        fields?.forEach((el, i) => {
          if (!memoizeCred[el]) {
            let err = new Error(`${el?.toLowerCase()} field Required`);
            err.name = el;
            throw err;
          }
        });

        setLoading(true);
        handleError("clear");
        await payWithCard();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err?.name) {
          handleError(err?.name);
          setErrorMessage(err?.message);
          return;
        }
      }
    },
    [memoizeCred]
  );

  const handleConfirmOrder = useCallback(
    async (id: string, method: string, amount: number) => {
      try {
        const data = product.map((el, i) => {
          const variantList = el?.selectedVariants?.map((vl, i) => vl.id);

          return {
            productId: el?.id,
            quantity: el?.quantity,
            variantList: variantList?.length ? variantList : [],
            price: el?.originalPrice,
          };
        });

        // console.log("data: ", data);

        if (user?.email) {
          const address = await getAddress({
            variables: {
              email: user?.email,
            },
          });

          // console.log("address: ", address);

          if (address?.data?.userAddress) {
            await updateAddress({
              variables: {
                addressId: address?.data?.userAddress?.id,
                address: memoizeCred?.address,
                city: memoizeCred?.city,
                postcode: memoizeCred?.postcode,
                userId: user?.email,
                firstName: memoizeCred?.firstName,
                lastName: memoizeCred?.lastName,
                number: memoizeCred?.phone,
              },
            });

            const createdOrder = await createOrders({
              variables: {
                tractionId: id,
                totalPrice: amount,
                subtotal: amount,
                addressId: address?.data?.userAddress?.id,
              },
            });

            // console.log("created order: ", createdOrder);

            const promises = [];

            data?.forEach((el, i) => {
              const promise = createProductOrder({
                variables: {
                  productId: el?.productId,
                  purchasedPrice: el?.price,
                  orderId: createdOrder.data?.createOrder?.id,
                  variantId: el?.variantList,
                  quantity: el?.quantity,
                },
              });

              promises.push(promise);
            });

            // console.log("promises: ", promises);
            // const test: Array<{
            //   name: string;
            //   price: string;
            //   quantity: string;
            // }> = [
            //   {
            //     name: "Test Product",
            //     quantity: "x2",
            //     price: "$12.00",
            //   },
            // ];

            await Promise.all(promises);
            const orderList = product?.map((el, i) => {
              return {
                name: el?.name,
                quantity: `x${el?.quantity}`,
                price: `$${el?.originalPrice?.toFixed(2)}`,
              };
            });
            axios("/api/user/sendOrder", {
              method: "POST",
              data: {
                email: user?.email,
                name: user?.name,
                orderno: `#${createdOrder?.data?.createOrder?.order_id}`,
                buyDate: new Date(Date.now()).toDateString(),
                orders: orderList,
                total: parseInt(
                  amount?.toString()?.slice(0, amount?.toString()?.length - 2)
                ).toFixed(2),
              },
            });
            // console.log("completed");
            showModal("order placed", "success");
            clearCart();
            router.push("/thankyou");

            return;
          }

          // console.log("im hrerere ererrere");

          const res = await createAddress({
            variables: {
              address: memoizeCred?.address,
              city: memoizeCred?.city,
              postcode: memoizeCred?.postcode,
              label: "default",
              userId: user?.email,
              firstName: memoizeCred?.firstName,
              lastName: memoizeCred?.lastName,
              number: memoizeCred?.phone,
            },
          });

          const createdOrder = await createOrders({
            variables: {
              tractionId: id,
              totalPrice: amount,
              subtotal: amount,
              addressId: res?.data?.createdAddress?.id,
            },
          });

          const promises = [];

          data?.forEach((el, i) => {
            const promise = createProductOrder({
              variables: {
                productId: el?.productId,
                purchasedPrice: el?.price,
                orderId: createdOrder.data?.createOrder?.id,
                variantId: el?.variantList,
                quantity: el?.quantity,
              },
            });

            promises.push(promise);
          });

          await Promise.all(promises);

          const orderList = product?.map((el, i) => {
            return {
              name: el?.name,
              quantity: `x${el?.quantity}`,
              price: `$${el?.originalPrice?.toFixed(2)}`,
            };
          });

          axios("/api/user/sendOrder", {
            method: "POST",
            data: {
              email: user?.email,
              name: user?.name,
              orderno: `#${createdOrder?.data?.createOrder?.order_id}`,
              buyDate: new Date(Date.now()).toDateString(),
              orders: orderList,
              total: parseInt(
                amount?.toString()?.slice(0, amount?.toString()?.length - 2)
              ).toFixed(2),
            },
          });
          showModal("order placed", "success");
          clearCart();
          router.push(`/thankyou`);
          return;
        }
      } catch (err) {
        // console.log("error at saving order");
        // console.log(err);
      }
    },
    [memoizeCred, product, user]
  );

  const payWithCard = async () => {
    try {
      const res = await axios({
        url: "/api/checkout",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ amount: renderPrice()?.toString() + "00" }),
      });
      setClientSecret(res?.data?.clientSecret);
      setShowStripe(true);
    } catch (err) {
      //@ts-ignore
    }
  };

  function IconPlaceholder() {
    return <div></div>;
  }

  function renderPrice() {
    let totalPrice: number = 0;

    product?.forEach((el) => {
      totalPrice += el?.discount_price;
    });

    return totalPrice;
  }

  return (
    <form className="w-full flex h-full flex-col gap-4  mt-10">
      <div className="flex gap-2 w-full ">
        <div className="flex gap-4 flex-col  w-full">
          <InputLabel
            backgroundColor="#e5e7eb"
            title={"First Name *"}
            Icon={IconPlaceholder}
            value={memoizeCred?.firstName}
            handleChange={handleCred("firstName")}
            error={memeoizeCredError?.firstName}
            errorMessage={renderErrorMessage("firstName")}
          />
        </div>
        <div className="flex gap-4 flex-col  w-full">
          <InputLabel
            backgroundColor="#e5e7eb"
            title={"Last Name *"}
            Icon={IconPlaceholder}
            value={memoizeCred?.lastName}
            handleChange={handleCred("lastName")}
            error={memeoizeCredError?.lastName}
            errorMessage={renderErrorMessage("lastName")}
          />
        </div>
      </div>
      <div className="flex gap-2 w-full ">
        <div className="flex gap-4 flex-col  w-full">
          <InputLabel
            backgroundColor="#e5e7eb"
            title={"Address *"}
            Icon={IconPlaceholder}
            value={memoizeCred?.address}
            handleChange={handleCred("address")}
            error={memeoizeCredError?.address}
            errorMessage={renderErrorMessage("address")}
          />
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex gap-4 flex-col  w-full">
          <InputLabel
            backgroundColor="#e5e7eb"
            title={"Phone/Mobile *"}
            Icon={IconPlaceholder}
            value={memoizeCred?.phone}
            handleChange={handleCred("phone")}
            error={memeoizeCredError?.phone}
            errorMessage={renderErrorMessage("phone")}
          />
        </div>
        <div className="flex gap-4 flex-col  w-full">
          <InputLabel
            backgroundColor="#e5e7eb"
            title={"Email *"}
            Icon={IconPlaceholder}
            value={memoizeCred?.email}
            handleChange={handleCred("email")}
            error={memeoizeCredError?.email}
            errorMessage={renderErrorMessage("email")}
          />
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex gap-4 flex-col  w-full">
          <InputLabel
            backgroundColor="#e5e7eb"
            title={"City/Town"}
            Icon={IconPlaceholder}
            value={memoizeCred?.city}
            handleChange={handleCred("city")}
            error={memeoizeCredError?.city}
            errorMessage={renderErrorMessage("city")}
          />
        </div>
        <div className="flex gap-4 flex-col  w-full">
          <InputLabel
            backgroundColor="#e5e7eb"
            title={"Postcode"}
            Icon={IconPlaceholder}
            value={memoizeCred?.postcode}
            handleChange={handleCred("postcode")}
            error={memeoizeCredError?.postcode}
            errorMessage={renderErrorMessage("postcode")}
          />
        </div>
      </div>
      <div className="w-full flex mt-10">
        <ButtonPrimary
          style={{ color: "white" }}
          loading={loading}
          onClick={handleSubmit}
          title="Save"
        />
      </div>
      <AnimatePresence>
        {showStripe && (
          <motion.div
            initial={{ y: "150%" }}
            animate={{ y: "10%" }}
            exit={{ y: "150%" }}
            transition={{ type: "keyframes" }}
            id="product-popup"
            className="w-[30rem] h-[90%] flex-col  px-10 shadow-xl bg-gradient-to-tr from-gray-200 to-gray-300  left-[35%] -top-5 rounded-xl flex  justify-center overflow-y-scroll z-[9999] absolute  hidescrollbar pt-96"
          >
            <div className="w-full flex items-center mb-10 justify-center">
              <Logo />
            </div>
            {clientSecret && (
              <Elements
                options={{
                  appearance: { theme: "flat", labels: "floating" },
                  clientSecret,
                }}
                stripe={stripePromise}
              >
                <StripeForm
                  handleClose={() => setShowStripe(false)}
                  price={renderPrice()}
                  placeOrder={handleConfirmOrder}
                />
              </Elements>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

export default memo(Form);
