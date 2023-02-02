import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  ChangeEvent,
  useContext,
} from "react";
import { Sidebar } from "../auth/register";
import Image from "next/image";
import Placeholder from "../../assets/images/reset-password.svg";
import { InputLabel, ButtonPrimary } from "@uiUtils";
import { RiLockPasswordLine } from "react-icons/ri";
import memoize from "fast-memoize";
import { UiConext } from "@context";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { queries } from "@queries";
import axios from "axios";

export default function ResetPassword() {
  const router = useRouter();
  const { showModal } = useContext(UiConext);

  const [isValidCredentials] = useLazyQuery(queries.isValidCredentials);

  const [passwords, setPasswords] = useState({
    password: "",
    passwordConfirm: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const memoizePasswords = useMemo(() => passwords, [passwords]);

  useEffect(() => {
    if (
      !router?.query?.oobCode ||
      !router?.query?.lang ||
      !router?.query?.apiKey
    )
      return;

    isValidCredentials({
      variables: {
        oobCode: router?.query?.oobCode,
      },
    })
      .then((res) => {
        // console.log(res?.data?.validCredentials);
        // console.log("credentials data");
        if (res?.data?.validCredentials?.length) {
          setEmail(res?.data?.validCredentials);
          setLoading(false);
          setVerified(true);
          return;
        }

        setLoading(false);
        setVerified(false);
      })
      .catch((err) => {
        setVerified(false);
        setLoading(false);
      });
  }, []);

  const handlePasswords = useCallback(
    memoize((type: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setPasswords({ ...memoizePasswords, [type]: e.target.value });
    }),
    [memoizePasswords]
  );

  const handleSubmit = async (e: any) => {
    try {
      if (!passwords?.password) {
        showModal("Password required", "error");
        return;
      }
      if (!passwords?.passwordConfirm) {
        showModal("Confirm Password Required", "error");
        return;
      }

      if (passwords.password !== passwords.passwordConfirm) {
        showModal("Password not matched", "error");
        return;
      }

      setUploading(true);

      await axios("/api/user/resetPassword", {
        method: "POST",
        data: {
          email: email,
          password: passwords?.password,
        },
      });

      showModal("Password updated", "success");
      router.push("/");

      setUploading(false);
    } catch (err) {
      // console.log(err);
    }
  };

  function render() {
    if (loading) {
      return (
        <>
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr to-main from-mainSecondary relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr to-main from-mainSecondary absolute animate-loader" />
          </div>
          <h2 className=" font-bold text-base text-primaryText/60">
            Verifying Your Email Please Wait.
          </h2>
        </>
      );
    }

    if (verified) {
      return (
        <>
          <h2 className="uppercase font-primary text-sx font-semibold text-primaryText">
            Reset Your Password
          </h2>
          <div className="w-60 h-60  relative">
            <Image src={Placeholder} alt="Placeholder" fill unoptimized />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6  w-1/2 ">
            <div className="flex flex-col gap-5">
              <InputLabel
                title="Password"
                type="password"
                Icon={RiLockPasswordLine}
                placeholder="Enter your password"
                handleChange={handlePasswords("password")}
                value={memoizePasswords.password}
              />
            </div>
            <div className="flex flex-col gap-5">
              <InputLabel
                title="Password Confirm"
                type="password"
                Icon={RiLockPasswordLine}
                placeholder="Confirm your password"
                handleChange={handlePasswords("passwordConfirm")}
                value={memoizePasswords.passwordConfirm}
              />
            </div>
            <div className="w-full flex items-center justify-center">
              <ButtonPrimary
                onClick={handleSubmit}
                type="submit"
                title="Save"
                style={{ color: "#fff" }}
                loading={uploading}
              />
            </div>
          </form>
        </>
      );
    }
  }

  return (
    <div className="w-full h-full flex bg-backgroundColorSecondary font-primary">
      <Sidebar />
      <div className="w-1/2 flex flex-col items-center justify-center gap-5 bg-backgroundColorSecondary">
        {render()}
      </div>
    </div>
  );
}
