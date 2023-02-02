import {
  memo,
  useMemo,
  useCallback,
  useState,
  useEffect,
  useContext,
  ChangeEvent,
} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import memoize from "fast-memoize";

import { BiRename, BiShoppingBag } from "react-icons/bi";
import { AiOutlineGoogle, AiOutlineShop } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { VscSymbolNamespace } from "react-icons/vsc";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

import { UiConext, UserContext } from "@context";
import { ButtonPrimary, InputLabel, SelectDropdown } from "@uiUtils";
import {
  RegisterProps,
  RegisterPropsErrors,
  RegisterPropsErrorMessage,
} from "@types";
import { register, authWithGoogle, logoutUser, uploadImage } from "@firebase";
import { queries } from "@queries";
import axios from "axios";

function Register(): JSX.Element {
  const router = useRouter();

  //@mutation
  const [createUser] = useMutation(queries.createUser);
  const [createBusinessProfile] = useMutation(queries.createBusinessProfile);
  const [createAuth] = useMutation(queries.createAuth);

  //@contexts
  const { showModal } = useContext(UiConext);
  const { setUser, user } = useContext(UserContext);

  //@states
  const [credState, setCred] = useState<RegisterProps>({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const [credErrorState, setCredError] = useState<RegisterPropsErrors>({
    name: false,
    email: false,
    number: false,
    password: false,
    confirmPassword: false,
  });
  const [credBusiness, setCredBusiness] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    state: "",
    sellerType: "SHOPOWNER" || "JOBBER" || "DISTRIBUTER",
    businessType: "VAPESHOP" || "SMOKESHOP" || "DISPENSARY" || "PACKAGING",
    doc: "",
  });

  const [credBusinessError, setCredBusinessError] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
    country: false,
    city: false,
    state: false,
    sellerType: false,
    businessType: false,
  });

  const [accountType, setAccountType] = useState("");
  const [errorMessageState, setErrorMessageState] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const cred = useMemo(() => credState, [credState]);
  const credError = useMemo(() => credErrorState, [credErrorState]);
  const credMessages = useMemo(() => errorMessageState, [errorMessageState]);
  const memoizeCredBusiness = useMemo(() => credBusiness, [credBusiness]);
  const memoizeBusinessCredError = useMemo(
    () => credBusinessError,
    [credBusinessError]
  );

  useEffect(() => {
    if (user.isExists === true && !cred?.email) {
      router.push("/");
    }
  }, [user.isExists, cred?.email]);

  //@handlers

  const handleError = (type: string | "clear"): void => {
    const errorDefault: RegisterPropsErrors = {
      name: false,
      email: false,
      number: false,
      password: false,
      confirmPassword: false,
    };

    if (type === "clear") {
      setCredError({ ...errorDefault });
      return;
    }

    setCredError({ ...errorDefault, [type]: true });
  };

  const handleBussinessError = (type: string | "clear"): void => {
    const def = {
      name: false,
      email: false,
      phone: false,
      address: false,
      country: false,
      city: false,
      state: false,
      sellerType: false,
      businessType: false,
    };

    if (type === "clear") {
      setCredBusinessError({ ...def });
      return;
    }

    setCredBusinessError({ ...def, [type]: true });
  };

  const handleCred = useCallback(
    memoize((type: string) => (e: ChangeEvent<HTMLInputElement>): void => {
      setCred({ ...cred, [type]: e.target.value });
    }),
    [cred]
  );

  const handleBusinessCred = useCallback(
    memoize((type: string) => (e: ChangeEvent<HTMLInputElement>): void => {
      if (type === "phone") {
        if (
          e.target.value.length === 0 ||
          e.target.value === "0" ||
          e.target.value === "+"
        ) {
          setCredBusiness({ ...memoizeCredBusiness, [type]: e.target.value });
          return;
        }
        if (!parseInt(e.target.value)) return;
      }
      setCredBusiness({ ...memoizeCredBusiness, [type]: e.target.value });
    }),
    [memoizeCredBusiness]
  );

  const handleImageSelect = useCallback(
    (e: any) => {
      const filePathURI = URL.createObjectURL(e.target.files[0]);
      const item = { target: { value: filePathURI } };
      // console.log("filepathURI: ", filePathURI);

      //@ts-ignore
      handleBusinessCred("doc")(item);
    },
    [memoizeCredBusiness]
  );

  const handleBusinessSelect = useCallback(
    memoize((type: string) => (val: string): void => {
      setCredBusiness({ ...memoizeCredBusiness, [type]: val });
    }),
    [memoizeCredBusiness]
  );

  const renderErrorMessage = useCallback(
    (type: string) => {
      if (credError[type]) {
        return credMessages;
      }
    },
    [credError, credMessages]
  );

  const renderBusinessErrorMessage = useCallback(
    (type: string) => {
      if (memoizeBusinessCredError[type]) {
        return credMessages;
      }
    },
    [memoizeBusinessCredError, credMessages]
  );

  const handleSubmit = useCallback(
    async (e: any) => {
      e?.preventDefault();

      if (!accountType) {
        showModal("choose account type: ", "error");
        return;
      }
      try {
        let businessId: string | null = null;
        // validate(cred);
        const fields = [
          "name",
          "email",
          "number",
          "password",
          "confirmPassword",
        ];
        fields?.forEach((el) => {
          if (!cred[el]) {
            let err = new Error(`${el?.toLowerCase()} field Required`);
            err.name = el;
            throw err;
          }
        });

        if (cred?.password?.length < 6) {
          let err = new Error("Password too short");
          err.name = "password";
          throw err;
        }

        if (cred.password !== cred?.confirmPassword) {
          let err = new Error("Password not matched");
          err.name = "confirmPassword";
          throw err;
        }

        if (accountType === "RETAILERS") {
          const businessFields = [
            "name",
            "email",
            "phone",
            "address",
            "country",
            "city",
            "state",
          ];

          businessFields.forEach((el) => {
            if (!memoizeCredBusiness[el]) {
              let err = new Error(`${el?.toLocaleLowerCase()} required`);
              err.name = "business " + el;
              throw err;
            }
          });

          if (!memoizeCredBusiness["sellerType"]?.length) {
            showModal("Select Seller Type", "error");
            return;
          }

          if (!memoizeCredBusiness["businessType"]?.length) {
            showModal("Select business type", "error");
            return;
          }

          if (!memoizeCredBusiness["doc"]?.length) {
            showModal("Select business permits please.", "error");
            return;
          }

          setLoading(true);
          const res = await uploadImage(memoizeCredBusiness["doc"]);
          // console.log("image response: ", res);

          const data = await createBusinessProfile({
            variables: {
              name: memoizeCredBusiness?.name,
              email: memoizeCredBusiness?.email?.toLowerCase(),
              phone: memoizeCredBusiness?.phone,
              country: memoizeCredBusiness?.country,
              address: memoizeCredBusiness?.address,
              city: memoizeCredBusiness?.city,
              state: memoizeCredBusiness?.state,
              doc: res,
              sellerType: memoizeCredBusiness?.sellerType,
              businesType: memoizeCredBusiness?.businessType,
            },
          });

          businessId = data.data?.createBusinesProfile?.id;
        }

        handleError("clear");

        setLoading(true);
        await register({
          name: cred?.name,
          email: cred?.email?.toLowerCase(),
          password: cred?.password,
        });

        await createUser({
          variables: {
            name: cred?.name,
            email: cred?.email?.toLowerCase(),
            number: cred?.number,
            type: accountType,
            businessId: businessId,
          },
        });
        const res = await axios("/api/user/sendVerificationEmail", {
          method: "POST",
          data: {
            email: cred?.email?.toLowerCase(),
            name: cred?.name,
          },
        });
        await createAuth({
          variables: {
            email: cred?.email?.toLowerCase(),
            oobCode: res?.data?.data?.split("oobCode=")[1]?.split("&")[0],
            mode: "verifyEmail",
          },
        });

        setUser({
          name: cred?.name,
          email: cred?.email?.toLowerCase(),
          number: cred?.number,
          isExists: true,
        });
        setLoading(false);
        router?.push("/");

        router?.reload();
      } catch (err) {
        // console.log(err);
        setLoading(false);

        if (err?.name?.includes(" ")) {
          handleBussinessError(err?.name?.split(" ")[1]);
          setErrorMessageState("business " + err?.message);
          return;
        }

        if (
          err?.message
            ?.toString()
            ?.toLowerCase()
            ?.includes("email-already-in-use")
        ) {
          handleError("email");
          setErrorMessageState("email already in use.");

          return;
        }

        if (err?.name) {
          handleError(err?.name);
          setErrorMessageState(err?.message);
          return;
        }
      }
    },
    [cred, loading, accountType, memoizeCredBusiness]
  );

  const handleAuthWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      const res = await authWithGoogle();
      await createUser({
        variables: {
          name: res?.name,
          email: res?.email,
          type: "CUSTOMERS",
        },
      });

      const response = await axios("/api/user/sendVerificationEmail", {
        method: "POST",
        data: {
          email: res?.email,
          name: res?.name,
        },
      });
      await createAuth({
        variables: {
          email: res?.email,
          oobCode: response?.data?.data?.split("oobCode=")[1]?.split("&")[0],
          mode: "verifyEmail",
        },
      });

      setUser({ ...res, isExists: true });
      setLoading(false);
      router?.push("/");
    } catch (err) {
      // console.log(err);
      setUser({
        email: null,
        name: null,
        isExists: false,
      });
      showModal("Email already exists", "error");
      setLoading(false);
      await logoutUser();
    }
  }, []);

  if ((user?.isExists === true && !cred?.email) || user?.isExists === null) {
    return <></>;
  }

  function renderBusinessDetails() {
    if (accountType === "RETAILERS") {
      return (
        <div className="flex flex-col gap-4 mt-10">
          <h2 className="font-bold text-md font-primary text-primaryText/80">
            Business Details
          </h2>
          <InputLabel
            title={"Business Name *"}
            Icon={VscSymbolNamespace}
            placeholder="Enter your business name"
            type="name"
            handleChange={handleBusinessCred("name")}
            value={memoizeCredBusiness?.name}
            error={memoizeBusinessCredError?.name}
            errorMessage={renderBusinessErrorMessage("name")}
          />
          <InputLabel
            title={"Business Email *"}
            Icon={MdEmail}
            placeholder="Enter your business email"
            type="email"
            handleChange={handleBusinessCred("email")}
            value={memoizeCredBusiness?.email}
            error={memoizeBusinessCredError?.email}
            errorMessage={renderBusinessErrorMessage("email")}
          />
          <InputLabel
            title={"Business Phone *"}
            Icon={() => (
              <BsTelephoneFill size={18} className="text-primaryText/60" />
            )}
            placeholder="Enter your business phone"
            handleChange={handleBusinessCred("phone")}
            value={memoizeCredBusiness?.phone}
            error={memoizeBusinessCredError?.phone}
            errorMessage={renderBusinessErrorMessage("phone")}
          />
          <InputLabel
            title={"Address *"}
            Icon={() => (
              <FaMapMarkerAlt size={18} className="text-primaryText/60" />
            )}
            placeholder="Enter your complete business address"
            handleChange={handleBusinessCred("address")}
            value={memoizeCredBusiness?.address}
            error={memoizeBusinessCredError?.address}
            errorMessage={renderBusinessErrorMessage("address")}
          />
          <InputLabel
            title={"Country *"}
            Icon={() => (
              <FaMapMarkerAlt size={18} className="text-primaryText/60" />
            )}
            placeholder="Enter your business Country"
            handleChange={handleBusinessCred("country")}
            value={memoizeCredBusiness?.country}
            error={memoizeBusinessCredError?.country}
            errorMessage={renderBusinessErrorMessage("country")}
          />
          <InputLabel
            title={"City *"}
            Icon={() => (
              <FaMapMarkerAlt size={18} className="text-primaryText/60" />
            )}
            placeholder="Enter your business seller type"
            handleChange={handleBusinessCred("city")}
            value={memoizeCredBusiness?.city}
            error={memoizeBusinessCredError?.city}
            errorMessage={renderBusinessErrorMessage("city")}
          />
          <InputLabel
            title={"State / Province *"}
            Icon={() => (
              <FaMapMarkerAlt size={18} className="text-primaryText/60" />
            )}
            placeholder="Enter your business seller type"
            handleChange={handleBusinessCred("state")}
            value={memoizeCredBusiness?.state}
            error={memoizeBusinessCredError?.state}
            errorMessage={renderBusinessErrorMessage("state")}
          />
          <SelectDropdown
            selected={memoizeCredBusiness?.sellerType || "Select seller type"}
            title="Seller type *"
            varaint="border"
          >
            <div className="w-full flex flex-col h-60 absolute z-[99999] rounded-md bg-gray-200 px-4 py-4 overflow-y-scroll">
              <div
                onClick={() => handleBusinessSelect("sellerType")("SHOPOWNER")}
                className="w-full flex p-2 hover:bg-gray-100 rounded-md transition duration-150 cursor-pointer"
              >
                <h2 className="font-primary text-base select-none">
                  Shop owner
                </h2>
              </div>
              <div
                onClick={() => handleBusinessSelect("sellerType")("JOBBER")}
                className="w-full flex p-2 hover:bg-gray-100 rounded-md transition duration-150 cursor-pointer"
              >
                <h2 className="font-primary text-base select-none">Jobber</h2>
              </div>
              <div
                onClick={() =>
                  handleBusinessSelect("sellerType")("DISTRIBUTER")
                }
                className="w-full flex p-2 hover:bg-gray-100 rounded-md transition duration-150 cursor-pointer"
              >
                <h2 className="font-primary text-base select-none">
                  Distributer
                </h2>
              </div>
            </div>
          </SelectDropdown>
          <SelectDropdown
            selected={
              memoizeCredBusiness?.businessType || "Select business type"
            }
            title="Business type *"
            varaint="border"
          >
            <div className="w-full flex flex-col h-60 absolute z-[99999] rounded-md bg-gray-200 px-4 py-4 overflow-y-scroll">
              <div
                onClick={() => handleBusinessSelect("businessType")("VAPESHOP")}
                className="w-full flex p-2 hover:bg-gray-100 rounded-md transition duration-150 cursor-pointer"
              >
                <h2 className="font-primary text-base select-none">
                  Vape Shop
                </h2>
              </div>
              <div
                onClick={() =>
                  handleBusinessSelect("businessType")("SMOKESHOP")
                }
                className="w-full flex p-2 hover:bg-gray-100 rounded-md transition duration-150 cursor-pointer"
              >
                <h2 className="font-primary text-base select-none">
                  Smoke Shop
                </h2>
              </div>
              <div
                onClick={() =>
                  handleBusinessSelect("businessType")("DISPENSARY")
                }
                className="w-full flex p-2 hover:bg-gray-100 rounded-md transition duration-150 cursor-pointer"
              >
                <h2 className="font-primary text-base select-none">
                  Dispensary
                </h2>
              </div>
              <div
                onClick={() =>
                  handleBusinessSelect("businessType")("PACKAGING")
                }
                className="w-full flex p-2 hover:bg-gray-100 rounded-md transition duration-150 cursor-pointer"
              >
                <h2 className="font-primary text-base select-none">
                  Packaging
                </h2>
              </div>
            </div>
          </SelectDropdown>
        </div>
      );
    }
  }

  return (
    <div className="w-full h-full flex">
      <MemoizeSideBar />
      <div className="w-full sm:w-1/2 flex flex-col items-start px-10 py-10 pb-40 sm:pb-40 justify-between overflow-y-scroll">
        <div>
          <h2 className="text-[26px] font-bold text-primaryText font-primary">
            Sign up
          </h2>
          <h2 className="font-semibold text-primaryText font-primary">
            Create an account with us.
          </h2>
        </div>
        <div className="w-full flex gap-5 mt-10">
          <div
            onClick={() => setAccountType("RETAILERS")}
            className={`signup-tabs ${
              accountType === "RETAILERS" &&
              "transition duration-200  scale-110"
            }`}
          >
            <AiOutlineShop size={40} className="text-white" />
            <h2>Retailer</h2>
          </div>
          <div
            onClick={() => setAccountType("CUSTOMERS")}
            className={`signup-tabs ${
              accountType === "CUSTOMERS" && "transition duration-200 scale-110"
            }`}
          >
            <BiShoppingBag size={40} className="text-white" />
            <h2>Customer</h2>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-[100%] flex flex-col gap-4 mt-10"
        >
          <InputLabel
            title={"Name *"}
            Icon={VscSymbolNamespace}
            placeholder="Enter your name"
            handleChange={handleCred("name")}
            value={cred?.name}
            error={credError?.name}
            errorMessage={renderErrorMessage("name")}
          />
          <InputLabel
            title={"Email *"}
            Icon={MdEmail}
            placeholder="Enter your email"
            type="email"
            handleChange={handleCred("email")}
            value={cred?.email}
            error={credError?.email}
            errorMessage={renderErrorMessage("email")}
          />
          <InputLabel
            title={"Number *"}
            Icon={() => (
              <BsTelephoneFill size={18} className="text-primaryText/60" />
            )}
            placeholder="Enter your phone number"
            handleChange={handleCred("number")}
            value={cred?.number}
            error={credError?.number}
            errorMessage={renderErrorMessage("number")}
          />
          <InputLabel
            title={"Password"}
            Icon={BiRename}
            placeholder="Choose your password"
            type="password"
            handleChange={handleCred("password")}
            value={cred?.password}
            error={credError?.password}
            errorMessage={renderErrorMessage("password")}
          />
          <InputLabel
            title={"Confirm password"}
            Icon={BiRename}
            placeholder="Type your password again"
            type="password"
            handleChange={handleCred("confirmPassword")}
            value={cred?.confirmPassword}
            error={credError?.confirmPassword}
            errorMessage={renderErrorMessage("confirmPassword")}
          />
          {renderBusinessDetails()}
          {accountType === "RETAILERS" ? (
            <div className=" sm:w-[50%] 2xl:w-[40%] flex mt-10 justify-between items-center gap-2">
              <div className="w-40 h-10 flex items-center justify-center rounded-md">
                <label className="cursor-pointer flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="cursor-pointer bg-transparent outline-none"
                    onChange={handleImageSelect}
                  />
                  <div className="w-40 h-12 rounded-md flex items-center justify-center bg-gradient-to-r from-main to-mainSecondary text-white">
                    <h2>Sellers Permits *</h2>
                  </div>
                </label>
              </div>
              <ButtonPrimary
                loading={loading}
                title={"Create acount"}
                onClick={handleSubmit}
                style={{ color: "white" }}
              />
            </div>
          ) : (
            <div className=" sm:w-[50%] 2xl:w-[40%] flex mt-10 justify-between items-center">
              <ButtonPrimary
                loading={loading}
                title={"Create acount"}
                onClick={handleSubmit}
                style={{ color: "white" }}
              />

              <div className="w-1 h-full border-l border-primaryText/30" />
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr to-primaryText from-black flex items-center justify-center cursor-pointer hover:scale-125 transition duration-200">
                  <AiOutlineGoogle
                    onClick={handleAuthWithGoogle}
                    size={18}
                    className="text-white"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr to-primaryText from-black flex items-center justify-center cursor-pointer hover:scale-125 transition duration-200">
                  <FaFacebookF size={18} className="text-white" />
                </div>
              </div>
            </div>
          )}
        </form>
        <div></div>
      </div>
    </div>
  );
}

export function Sidebar(): JSX.Element {
  return (
    <div className="h-full w-1/2 bg-gradient-to-tr to-main from-mainSecondary hidden sm:flex flex-col items-start  p-10 justify-between">
      <Link passHref href="/">
        <h2 className="text-base font-bold text-white font-primary uppercase tracking-wider cursor-pointer">
          Day2day
        </h2>
      </Link>
      <div className="-mt-20 flex flex-col gap-5 w-[80%]">
        <div className="w-full flex gap-10 items-center">
          <div className="2xl:w-60 2xl:h-60 w-[40%] h-[100%] relative">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/day2day-25451.appspot.com/o/svgs%2FVector_02-01.svg?alt=media&token=7e3f4858-b65c-46a9-8a4d-692bf09a0135"
              alt="day2day"
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col w-[54%] gap-4">
            <h2 className="text-white font-bold w-full text-[24px] 2xl:text-[40px] font-primary mt-2 uppercase">
              Start your journey with us.
            </h2>
            <h2 className="text-white text-base font-primary w-[100%]">
              Discover the world best e-cigarettes, vapes, and accessories. Of
              renowned brands.
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full flex">
        <div className="signup-categories-parent">
          <Image
            src="https://portal.day2daywholesale.com/public/assets/img/category/Devices-01.svg"
            alt="brand-2"
            fill
            className="covert-white object-cover signupChild p-2"
            unoptimized
          />
        </div>
        <div className="signup-categories-parent">
          <Image
            src="https://portal.day2daywholesale.com/public/assets/img/category/Disposable-01.svg"
            alt="brand-3"
            fill
            className="covert-white object-cover signupChild p-2"
            unoptimized
          />
        </div>
        <div className="signup-categories-parent">
          <Image
            src="https://portal.day2daywholesale.com/public/assets/img/category/E%20Liquid-01.svg"
            alt="brand-4"
            fill
            className="covert-white object-cover signupChild p-2"
            unoptimized
          />
        </div>
        <div className="signup-categories-parent">
          <Image
            src="https://portal.day2daywholesale.com/public/assets/img/category/Accessories-01.svg"
            alt="brand-5"
            fill
            className="covert-white object-cover signupChild p-2"
            unoptimized
          />
        </div>
        <div className="signup-categories-parent">
          <Image
            src="https://portal.day2daywholesale.com/public/assets/img/category/Smoke%20Shop-01.svg"
            alt="brand-6"
            fill
            className="covert-white object-cover signupChild p-2"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

const MemoizeSideBar = memo(Sidebar);

export default memo(Register);
