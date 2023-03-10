import { useAuth } from "@/context/userContext";
import { GoogleIcon } from "@/utils/Icons/GoogleIcon";
import { notification } from "antd";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { BiLoader } from "react-icons/bi";

const LoginSection = () => {
  const auth = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleGoogleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (auth?.loading) {
      return;
    }
    const res = await auth?.signinWithGoogle("/dashboard");
    if (res?.code) {
      notification.error({
        message: "Error! User not found",
      });
      return;
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (isSignUp) {
      if (
        e.currentTarget.password.value !== e.currentTarget.confirmpassword.value
      ) {
        notification.error({ message: "Password does not match!" });
        setIsLoading(false);
        return;
      }
      const signupdata = {
        email: e.currentTarget.emailId.value,
        password: e.currentTarget.password.value,
      };
      const resp = await auth?.createUserwithEmail(
        signupdata.email,
        signupdata.password,
        "/dashboard"
      );
      if (resp?.code) {
        notification.error({
          message: "Error! try again",
        });
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    } else {
      const data = {
        email: e.currentTarget.emailId.value,
        password: e.currentTarget.password.value,
      };
      const res = await auth?.signInWithEmailPassword(
        data.email,
        data.password,
        "/dashboard"
      );
      if (res?.code) {
        notification.error({
          message: "Error! User not found",
        });
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    }
  };
  return (
    <div
      className={classNames(
        "max-w-[330px] w-full mx-auto border-gray-700 mt-10", isSignUp ? "mt-16" : ""
      )}
    >
      <div className="flex justify-around">
        <div className="flex items-center">
          <Image
            className=""
            src="/assets/miniminds_1.png"
            height={55}
            priority={false}
            width={55}
            alt=""
          />
          <h3 className="text-3xl font-semibold leading-[29px] text-primary_black">
            MiniMinds
          </h3>
        </div>
      </div>
      <p className="mx-auto mt-2 font-medium text-xs leading-[15px] text-center text-primary_gray">
        Helping educators and students to improve their memory and cognitive
        skills through fun and engaging gameplay.
      </p>
      <form className="mt-6" onSubmit={handleEmailLogin}>
        <div>
          <label
            htmlFor="emailId"
            className="flex flex-col leading-[19px]"
          >
            Email
          </label>
          <input
            type="email"
            name="emailId"
            id="emailId"
            required
            placeholder="teacher@gmail.com"
            className="bg-transparent border mt-2 border-black text-primary_black placeholder:text-gray-500 text-sm leading-[19px] w-full rounded focus:outline-none focus-within:ring-1 focus:ring-primary"
          />
        </div>
        <div className="mt-4">
          <label className="flex flex-col leading-[19px]">
            Password
          </label>
          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              required
              name="password"
              id="password"
              placeholder="Password"
              className="bg-transparent border border-black text-primary_black placeholder:text-gray-500 text-sm leading-[19px] w-full rounded focus:outline-none focus-within:ring-1 focus:ring-primary"
            />
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
                className="w-5 cursor-pointer absolute top-1/2 -translate-y-1/2 right-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
                className="w-5 cursor-pointer absolute top-1/2 -translate-y-1/2 right-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </div>
        </div>
        {isSignUp && (
          <div className="mt-4">
            <label className="flex flex-col leading-[19px]">
              Confirm Password
            </label>
            <div className="relative mt-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm Password"
                required
                className="bg-transparent border border-black text-primary_black placeholder:text-gray-500 text-sm leading-[19px] w-full rounded focus:outline-none focus-within:ring-1 focus:ring-primary"
              />
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  onClick={(e: SyntheticEvent) => {
                    e.preventDefault();
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  className="w-5 cursor-pointer absolute top-1/2 -translate-y-1/2 right-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  onClick={(e: SyntheticEvent) => {
                    e.preventDefault();
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  className="w-5 cursor-pointer absolute top-1/2 -translate-y-1/2 right-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </div>
          </div>
        )}

        <p className="text-right my-2 text-sm font-medium">
          {isSignUp ? "Already have an account?" : "not a user?"}
          <span
            className="underline ml-2 cursor-pointer"
            onClick={(e: SyntheticEvent) => {
              e.preventDefault();
              setIsSignUp(!isSignUp);
            }}
          >
            {isSignUp ? "Login" : "SignUp"}
          </span>
        </p>
        <button
          type="submit"
          className="rounded bg-primary leading-[19px] mt-2 font-semibold text-white border border-primary py-3 text-center flex-1 flex justify-center w-full"
        >
          {isLoading && <BiLoader className="animate-spin mr-4" />}
          {isSignUp ? "Signup with Email" : "Login with Email"}
        </button>
      </form>
      <div className="relative flex py-3 items-center">
        <div className="flex-grow border-t border-primary_gray"></div>
        <span className="flex-shrink mx-4 text-[12px] leading-[15px]  border-primary_gray">
          OR
        </span>
        <div className="flex-grow border-t border-primary_gray"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="flex flex-1 py-3 gap-2 justify-center border items-center border-black bg-white w-full rounded"
      >
        {auth?.loading && <BiLoader className="animate-spin mr-2" />}
        <GoogleIcon className="" />
        <p className="leading-[19px] font-semibold">
          {isSignUp ? "Signup" : "Login"} with Google
        </p>
      </button>
    </div>
  );
};
export default LoginSection;
