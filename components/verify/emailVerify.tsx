import { useState, useEffect } from "react";
import { Sidebar } from "../auth/register";
import Image from "next/image";
import { ButtonPrimary } from "@uiUtils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import { queries } from "@queries";

import Placeholder from "../../assets/images/email-verified.svg";
import FailedPlaceholder from "../../assets/images/email-verification-failed.svg";
import axios from "axios";

export default function EmailVerify(): JSX.Element {
  const router = useRouter();
  const [isValidCredentials] = useLazyQuery(queries.isValidCredentials);
  const [toggleUserVerify] = useMutation(queries.toggleUserVerify);

  const [loading, setLoading] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(false);

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
        if (res?.data?.validCredentials?.length) {
          axios("/api/user/verifyEmail", {
            method: "POST",
            data: {
              email: res?.data?.validCredentials,
            },
          })
            .then((_userVerified) => {
              toggleUserVerify({
                variables: {
                  email: res?.data?.validCredentials,
                },
              });
              setLoading(false);
              setVerified(true);
            })
            .catch((err) => {
              setLoading(false);
              setVerified(false);
            });

          return;
        }

        setLoading(false);
        setVerified(false);
      })
      .catch((err) => {
        setVerified(false);
        setLoading(false);
      });
  }, [router?.query]);

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
          <div className="w-60 h-60 relative">
            <Image src={Placeholder} alt="placeholder" fill unoptimized />
          </div>
          <div className="text-center">
            <h2 className=" font-bold text-base text-primaryText/60">
              Your Email Address Has Been Verified
            </h2>
            <h2 className="text-sx text-primaryText/60">
              Thank you for using Day2Day Wholesale
            </h2>
          </div>
          <Link passHref href="/">
            <ButtonPrimary title="Home" style={{ color: "#fff" }} />
          </Link>
        </>
      );
    }

    return (
      <>
        <div className="w-60 h-60 relative">
          <Image src={FailedPlaceholder} alt="placeholder" fill unoptimized />
        </div>
        <div className="text-center">
          <h2 className=" font-semibold text-sx text-red-600">
            Link May Have Been Expired Or Already Used!!!
          </h2>
        </div>
        <Link passHref href="/">
          <ButtonPrimary title="Home" style={{ color: "#fff" }} />
        </Link>
      </>
    );
  }

  return (
    <div className="w-full h-full flex bg-backgroundColorSecondary font-primary">
      <Sidebar />
      <div className="w-1/2 flex flex-col items-center justify-center gap-10">
        {render()}
      </div>
    </div>
  );
}
