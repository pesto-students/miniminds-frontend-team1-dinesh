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
      console.log(res);
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
        <div className="mt-4">
          <label className="flex flex-col text-[16px] leading-[19px] font-[400]">
            Password
          </label>
          <input
            type="password"
            required
            name="password"
            id="password"
            placeholder="Password"
            className="bg-transparent border mt-2 border-black text-[#2E2C29] placeholder:text-[#2E2C29] px-4 py-3 text-[16px] font-[400] leading-[19px] w-full rounded-[5px] py"
          />
        </div>
        {isSignUp && (
          <div className="mt-4">
            <label className="flex flex-col text-[16px] leading-[19px] font-[400]">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm Password"
              required
              className="bg-transparent border mt-2 border-black text-[#2E2C29] placeholder:text-[#2E2C29] px-4 py-3 text-[16px] font-[400] leading-[19px] w-full rounded-[5px] py"
            />
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
