import {
  memo,
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
  useContext,
} from "react";
import { MdEmail } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import memoize from "fast-memoize";

import { InputLabel, ButtonPrimary } from "@uiUtils";
import { ChangePasswordProps, ChangePasswordErrorProps } from "@types";
import { updateUserPassword } from "@firebase";
import { UiConext } from "@context";

function ChangePassword({ email }: { email: string }): JSX.Element {
  const { showModal } = useContext(UiConext);

  const [cred, setCred] = useState<ChangePasswordProps>({
    oldPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  });
  const [credErorr, setCredError] = useState<ChangePasswordErrorProps>({
    oldPassword: false,
    newPassword: false,
    newConfirmPassword: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const memoizeCred = useMemo(() => cred, [cred]);
  const memoizeCredError = useMemo(() => credErorr, [credErorr]);
  const memoizeLoading = useMemo(() => loading, [loading]);
  const memoizeErrorMessage = useMemo(() => errorMessage, [errorMessage]);

  const handleCred = useCallback(
    memoize((type: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setCred({ ...cred, [type]: e.target.value });
    }),
    [memoizeCred]
  );

  const handleError = (type: string | "clear") => {
    const def: ChangePasswordErrorProps = {
      oldPassword: false,
      newPassword: false,
      newConfirmPassword: false,
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
      try {
        const fields = ["oldPassword", "newPassword", "newConfirmPassword"];
        fields?.forEach((el) => {
          if (!memoizeCred[el]) {
            let err = new Error(`${el?.toLowerCase()} field Required`);
            err.name = el;
            throw err;
          }
        });

        if (memoizeCred?.newPassword !== memoizeCred?.newConfirmPassword) {
          let err = new Error("New confirm password not matched.");
          err.name = "newConfirmPassword";
          throw err;
        }

        if (memoizeCred?.newPassword?.length < 6) {
          let err = new Error("Password too week.");
          err.name = "newPassword";
          throw err;
        }

        handleError("clear");
        setLoading(true);

        await updateUserPassword({
          email: email,
          oldPassword: memoizeCred?.oldPassword,
          newPassword: memoizeCred?.newPassword,
        });
        setLoading(true);
        showModal("password updated.");
      } catch (err) {
        // console.log(err);
        setLoading(false);
        // console.log(err?.message?.toString()?.includes("wrong-password"));
        if (err?.message?.toString()?.includes("wrong-password")) {
          // console.log("im here");
          handleError("oldPassword");
          setErrorMessage("Wrong passowrd");
          return;
        }

        if (err?.name) {
          handleError(err?.name);
          setErrorMessage(err?.message);
          return;
        }
      }
    },
    [memoizeCred]
  );

  const renderErrorMessage = useCallback(
    (type: string) => {
      if (memoizeCredError[type]) {
        return memoizeErrorMessage;
      }
    },
    [memoizeCredError, memoizeErrorMessage]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex items-center flex-col gap-8"
    >
      <div className="flex gap-10 w-full flex-col sm:flex-row">
        <div className="change-password-fields">
          <InputLabel
            title={"Email"}
            placeholder="Your email"
            Icon={MdEmail}
            disabled
            value={email}
          />
        </div>
        <div className="change-password-fields">
          <InputLabel
            title={"Old Password *"}
            placeholder="Your old password"
            Icon={CgPassword}
            handleChange={handleCred("oldPassword")}
            value={memoizeCred?.oldPassword}
            error={memoizeCredError.oldPassword}
            errorMessage={renderErrorMessage("oldPassword")}
            type="password"
          />
        </div>
      </div>
      <div className="flex gap-10 w-full sm:flex-row flex-col">
        <div className="change-password-fields">
          <InputLabel
            title={"New password *"}
            placeholder="New password"
            Icon={CgPassword}
            handleChange={handleCred("newPassword")}
            value={memoizeCred?.newPassword}
            error={memoizeCredError.newPassword}
            errorMessage={renderErrorMessage("newPassword")}
            type="password"
          />
        </div>
        <div className="change-password-fields">
          <InputLabel
            title={"New password confirm *"}
            placeholder="Confirm new password"
            Icon={CgPassword}
            handleChange={handleCred("newConfirmPassword")}
            value={memoizeCred?.newConfirmPassword}
            error={memoizeCredError.newConfirmPassword}
            errorMessage={renderErrorMessage("newConfirmPassword")}
            type="password"
          />
        </div>
      </div>
      <div className="flex w-full flex-start">
        <ButtonPrimary
          onClick={handleSubmit}
          style={{ color: "white" }}
          title="Update"
          loading={loading}
        />
      </div>
    </form>
  );
}

export default memo(ChangePassword);
