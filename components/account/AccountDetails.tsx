import {
  memo,
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
  useEffect,
  useContext,
} from "react";
import memoize from "fast-memoize";
import { AnimatePresence, motion } from "framer-motion";

import { ButtonPrimary, InputLabel } from "@uiUtils";
import { CheckoutPropsError, CheckoutProps } from "@types";
import { useLazyQuery, useMutation } from "@apollo/client";
import { queries } from "@queries";
import { UiConext } from "@context";

function AccountDetails({ email: userEmail }: { email: string }): JSX.Element {
  const { showModal } = useContext(UiConext);

  //@queries
  const [
    fetchUserAddress,
    { loading: fetchingUserAddress, data: userAddressData },
  ] = useLazyQuery(queries.userAddress);

  const [updateAddress] = useMutation(queries.updateAddress);

  // const []

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

  //@memoization
  const memoizeCred = useMemo(() => cred, [cred]);
  const memeoizeCredError = useMemo(() => credError, [credError]);
  const memoizeErrorMessage = useMemo(() => errorMessage, [errorMessage]);

  //@hooks
  useEffect(() => {
    if (!userEmail) return;

    fetchUserAddress({
      variables: {
        email: userEmail,
      },
    });
  }, [userEmail]);

  useEffect(() => {
    return setCred({
      address: userAddressData?.userAddress?.address,
      city: userAddressData?.userAddress?.city,
      firstName: userAddressData?.userAddress?.firstName,
      lastName: userAddressData?.userAddress?.lastName,
      postcode: userAddressData?.userAddress?.postCode,
      email: userEmail,
      phone: userAddressData?.userAddress?.number,
    });
  }, [userAddressData]);

  //@handlers
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

  function IconPlaceholder() {
    return <></>;
  }

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

        if (!userAddressData?.userAddress?.id) {
          showModal("something went wrong");
          return;
        }

        setLoading(true);
        handleError("clear");
        await updateAddress({
          variables: {
            address: memoizeCred?.address,
            city: memoizeCred?.city,
            postcode: memoizeCred?.postcode,
            label: "default",
            userId: userEmail,
            firstName: memoizeCred?.firstName,
            lastName: memoizeCred?.lastName,
            addressId: userAddressData?.userAddress?.id,
            number: memoizeCred?.phone,
          },
        });
        setLoading(false);
        showModal("address updated");
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

  return (
    <motion.form
      initial={{
        opacity: 0,
        y: "-10%",
      }}
      animate={{
        opacity: 1,
        y: "0%",
      }}
      exit={{
        opacity: 0,
        y: "-10%",
      }}
      className="w-full flex h-full flex-col gap-4  mt-10"
    >
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
            loading={fetchingUserAddress}
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
            loading={fetchingUserAddress}
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
            loading={fetchingUserAddress}
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
            loading={fetchingUserAddress}
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
            loading={fetchingUserAddress}
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
            loading={fetchingUserAddress}
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
            loading={fetchingUserAddress}
          />
        </div>
      </div>
      <div className="w-full flex mt-10">
        <ButtonPrimary
          loading={loading}
          onClick={handleSubmit}
          title={memoizeCred?.firstName ? "Update" : "Save"}
          style={{
            color: "white",
          }}
        />
      </div>
    </motion.form>
  );
}

export default memo(AccountDetails);
