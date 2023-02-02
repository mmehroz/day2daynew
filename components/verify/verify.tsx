import React from "react";
import { useRouter } from "next/router";

import EmailVerify from "./emailVerify";
import ResetPassword from "./resetPassword";

export default function Verify() {
  const router = useRouter();

  function render() {
    if (router?.query?.mode === "verifyEmail") {
      return <EmailVerify />;
    }

    if(router?.query?.mode === "resetPassword") {
      return <ResetPassword />
    }
  }

  return <>{render()}</>;
}
