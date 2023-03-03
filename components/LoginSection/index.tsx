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
        "max-w-[346px] w-full mx-auto  border-gray-700",
        isSignUp ? "pt-28 lg:pt-64" : "pt-28 lg:pt-72"
      )}
    >
      <div className="flex justify-around">
        <div className="flex items-center">
          <Image
            className=""
            src="/assets/miniminds_1.png"
            height={93}
            width={93}
            alt=""
          />
          <h3 className="text-[24px] font-[600] leading-[29px] text-[#555555]">
            MiniMinds
          </h3>
        </div>
      </div>
      <p className="mx-auto font-[500] text-[12px] leading-[15px] text-center text-[#555555]">
        Helping educators and students to improve their memory and cognitive
        skills through fun and engaging gameplay.
      </p>
      <form className="mt-9" onSubmit={handleEmailLogin}>
        <div>
          <label
            htmlFor="emailId"
            className="flex flex-col text-[16px] leading-[19px] font-[400]"
          >
            Email
          </label>
          <input
            type="email"
            name="emailId"
            id="emailId"
            required
            placeholder="teachername1.gmail.comp"
            className="bg-transparent border mt-2 border-black text-[#2E2C29] placeholder:text-[#2E2C29] px-4 py-3 text-[16px] font-[400] leading-[19px] w-full rounded-[5px] py"
          />
        </div>
        <div className="mt-4 relative">
          <label className="flex flex-col text-[16px] leading-[19px] font-[400]">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            required
            name="password"
            id="password"
            placeholder="Password"
            className="bg-transparent border mt-2 border-black text-[#2E2C29] placeholder:text-[#2E2C29] px-4 py-3 text-[16px] font-[400] leading-[19px] w-full rounded-[5px] py"
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
              className="w-6 cursor-pointer h-6 absolute z-10 top-10 right-3"
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
              className="w-6 cursor-pointer h-6 absolute z-10 top-10 right-3"
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
        {isSignUp && (
          <div className="mt-4 relative">
            <label className="flex flex-col text-[16px] leading-[19px] font-[400]">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm Password"
              required
              className="bg-[#E9E1D1] border mt-2 border-black text-[#2E2C29] placeholder:text-[#2E2C29] px-4 py-3 text-[16px] font-[400] leading-[19px] w-full rounded-[5px] py"
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
                className="w-6 cursor-pointer h-6 absolute z-10 top-10 right-3"
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
                className="w-6 cursor-pointer h-6 absolute z-10 top-10 right-3"
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
        )}

        <p className="text-right mt-3 text-sm">
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
          className="rounded-[5px] bg-[#19B03D] leading-[19px] text-[16px] mt-2 font-[600] text-white border border-[#19B03D] py-3 text-center flex-1 flex justify-center w-full"
        >
          {isLoading && <BiLoader className="animate-spin mr-4" />}
          {isSignUp ? "Signup with Email" : "Login with Email"}
        </button>
      </form>
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-[#555555]"></div>
        <span className="flex-shrink mx-4 text-[12px] leading-[15px] font-[400] border-[#555555]">
          OR
        </span>
        <div className="flex-grow border-t border-[#555555]"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="flex flex-1 py-3 gap-2 justify-center border items-center border-black bg-white w-full rounded-[5px]"
      >
        {auth?.loading && <BiLoader className="animate-spin mr-2" />}
        <GoogleIcon className="" />
        <p className="leading-[19px] font-[600] text-[16px]">
          {isSignUp ? "Signup" : "Login"} with Google
        </p>
      </button>
    </div>
  );
};
export default LoginSection;
