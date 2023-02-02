import {
  memo,
  useContext,
  useState,
  useCallback,
  ChangeEvent,
  useMemo,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import memoize from "fast-memoize";
import Link from "next/link";

import { RiFacebookFill } from "react-icons/ri";
import { BsKeyFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiOutlineGoogle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

import LoginPlaceholder from "../../assets/images/vector-2.svg";
import { ButtonPrimary, InputLabel, Logo } from "@uiUtils";
import { UiConext, UserContext } from "@context";
import { login, authWithGoogle, logoutUser } from "@firebase";
import { useLazyQuery, useMutation } from "@apollo/client";
import { queries } from "@queries";
import axios from "axios";

function Login(): JSX.Element {
  const { hideLogin, showModal, loginState } = useContext(UiConext);
  const { setUser } = useContext(UserContext);
  const [createAuth] = useMutation(queries.createAuth);

  //@quereis
  const [fetchValidateUser] = useLazyQuery(queries.valdateUser);

  //@states
  const [cred, setCred] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [resetPassword, setResetPassword] = useState<boolean>(false);

  const handleCred = useCallback(
    memoize((type: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setCred({ ...cred, [type]: e.target.value });
    }),
    [cred]
  );

  const handlePasswordReset = (email: string) => {
    return new Promise((resolve, reject) => {
      axios("/api/user/sendResetPassword", {
        method: "POST",
        data: {
          email: email,
        },
      })
        .then((res) => {
          createAuth({
            variables: {
              email: email,
              mode: "passwordReset",
              oobCode: res?.data?.data?.split("oobCode=")[1]?.split("&")[0],
            },
          })
            .then((authRes) => {
              resolve(authRes);
            })
            .catch((authError) => {
              reject(authError);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const handleSubmit = useCallback(
    async (e: any) => {
      e?.preventDefault();
      try {
        setErrors({ email: false, password: false });

        if (!cred?.email) {
          setErrors((prev) => {
            return { ...prev, email: true };
          });
          throw new Error("Email field is required");
        }

        if (!cred?.email?.includes("@") || !cred?.email?.includes(".com")) {
          setErrors((prev) => {
            return { ...prev, email: true };
          });

          throw new Error("Invalid email");
        }

        if (resetPassword) {
          setAuthenticating(true);
          await handlePasswordReset(cred?.email);
          setAuthenticating(false);
          showModal("Check your mail also spam.", "success");
          hideLogin();
          setResetPassword(false);
          return;
        }

        if (!cred?.password) {
          setErrors((prev) => {
            return { ...prev, password: true };
          });

          throw new Error("Password field is required");
        }
        setAuthenticating(true);

        const user = await fetchValidateUser({
          variables: {
            email: cred?.email,
          },
        });

        if (!user?.data?.isUserExist) {
          showModal("No user found with this email.", "error");

          throw new Error("user not exists");
        }

        const res = await login({
          email: cred?.email,
          password: cred?.password,
        });
        setAuthenticating(false);
        showModal("logged in successfully", "success");
        // console.log(res);
        hideLogin();
      } catch (err) {
        setAuthenticating(false);
        // console.log(err);
        if (err?.message?.toString()?.toLowerCase().includes("email")) {
          setErrorMessage({
            email: err?.message,
            password: "",
          });

          return;
        }

        if (err?.message?.toString()?.toLowerCase()?.includes("firebase")) {
          if (
            err?.message?.toString()?.toLowerCase()?.includes("user-not-found")
          ) {
            setErrorMessage({
              email: "Invalid Email",
              password: "",
            });

            return;
          }

          if (
            err?.message?.toString()?.toLowerCase()?.includes("wrong-password")
          ) {
            setErrorMessage({
              email: "",
              password: "Invalid password",
            });
          }

          return;
        }
        setErrorMessage({
          email: "",
          password: err?.message,
        });
      }
    },
    [cred, resetPassword]
  );

  const handleGoogle = useCallback(async () => {
    try {
      setAuthenticating(true);
      const res = await authWithGoogle();
      const user = await fetchValidateUser({
        variables: {
          email: res?.email,
        },
      });

      if (!user?.data?.isUserExist) {
        showModal("No user found with this email.", "error");

        throw new Error("user not exists");
      }

      showModal("Logged in successfully", "success");
      setUser({ ...res, isExists: true });
      hideLogin();
      setAuthenticating(false);
    } catch (err) {
      setUser({
        email: null,
        name: null,
        isExists: false,
      });
      setAuthenticating(false);
      logoutUser().then((res) => {});
    }
  }, []);

  return (
    <AnimatePresence>
      {loginState && (
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
          id="product-popup"
          className="w-[85%] sm:w-[60%] h-[80%] left-[8%] top-[8%] sm:left-[20%] sm:top-[12%] rounded-lg bg-backgroundColorSecondary absolute z-[9999999] flex"
        >
          <MemoizeLogin hideLogin={hideLogin} />
          <div className="w-full sm:w-[50%] h-full flex flex-col py-4 justify-between items-center">
            <div className="w-full flex justify-between items-center">
              <div></div>
              <Logo />
              <div
                onClick={() => {
                  hideLogin();
                }}
                className="w-6 h-6 rounded-full bg-gradient-to-tr to-primaryText from-black mr-4 text-white flex items-center justify-center cursor-pointer hover:scale-110 duration-200 transition"
              >
                <IoClose />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 w-full items-center"
            >
              <div className="w-[80%] flex items-center">
                <h2 className="text-primaryText/80 font-primary text-md font-bold">
                  {resetPassword ? "Reset Password" : "Login"}
                </h2>
              </div>
              <div className="w-[80%] flex flex-col gap-2">
                <InputLabel
                  Icon={MdEmail}
                  title="Email"
                  placeholder="Enter your email"
                  value={cred?.email}
                  handleChange={handleCred("email")}
                  error={errors?.email}
                  type="email"
                  errorMessage={errorMessage?.email}
                />
              </div>
              {!resetPassword && (
                <div className="w-[80%] flex flex-col gap-2">
                  <InputLabel
                    Icon={BsKeyFill}
                    title="Password"
                    placeholder="Enter your password"
                    value={cred?.password}
                    handleChange={handleCred("password")}
                    error={errors?.password}
                    type="password"
                    errorMessage={errorMessage?.password}
                  />
                </div>
              )}
              <div className="w-[80%] flex sm:hidden items-center gap-2">
                <h2 className="text-sx font-semibold text-primaryText font-primary">
                  Not registered yet?
                </h2>
                <Link onClick={hideLogin} passHref href="/register">
                  <h2 className="text-sx font-semibold text-main font-primary">
                    Register
                  </h2>
                </Link>
              </div>
              <button type="submit" />
            </form>

            <div className="flex flex-col w-full items-center gap-2">
              <div className="w-[80%] flex">
                <ButtonPrimary
                  style={{ width: "100%", color: "white" }}
                  title={resetPassword ? "Send Reset Link" : "Login"}
                  onClick={handleSubmit}
                  loading={authenticating}
                />
              </div>
              <div className="flex gap-2 w-[80%] items-center h-10">
                <div className="flex gap-2 items-center -mt-1 w-full">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-110 duration-200 transition hover:bg-gradient-to-tr hover:to-main hover:from-mainSecondary hover:text-white text-primaryText">
                    <AiOutlineGoogle onClick={handleGoogle} size={20} />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-110 duration-200 transition hover:bg-gradient-to-tr hover:to-main hover:from-mainSecondary hover:text-white text-primaryText relative">
                    <RiFacebookFill size={20} />
                  </div>
                  <div className="w-[80%]  justify-end flex">
                    <h2
                      onClick={() => setResetPassword(!resetPassword)}
                      className="text-sx font-primary font-semibold text-primaryText cursor-pointer hover:text-mainSecondary duration-200 transition"
                    >
                      {resetPassword
                        ? "Login my account"
                        : "Forget your password?"}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SideBar({ hideLogin }: { hideLogin: () => void }): JSX.Element {
  return (
    <div className="w-[50%] h-full bg-gradient-to-tr to-main from-mainSecondary hidden sm:flex items-center justify-center rounded-l-lg flex-col">
      <AnimatePresence>
        <motion.div
          initial={{
            y: "-1%",
          }}
          animate={{ y: "1%" }}
          exit={{
            scale: "-5%",
          }}
          transition={{
            ease: "linear",
            duration: 2,
            repeat: Infinity,
            delay: 0.4,
            type: "tween",
            repeatType: "reverse",
          }}
          className="w-[80%] h-[80%] relative"
        >
          <Image
            src={LoginPlaceholder}
            alt="Login"
            fill
            quality={100}
            unoptimized
          />
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center gap-2">
        <h2 className="text-black font-primary font-semibold text-sx">
          Not registered yet?
        </h2>
        <Link
          onClick={() => {
            hideLogin();
          }}
          passHref
          href="/register"
        >
          <h2 className="text-white transition duration-200 cursor-pointer text-sx font-primary font-semibold">
            Register
          </h2>
        </Link>
      </div>
    </div>
  );
}

const MemoizeLogin = memo(SideBar);

export default memo(Login);
