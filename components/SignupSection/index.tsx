import { useAuth } from "@/context/userContext";
import { GoogleIcon } from "@/utils/Icons/GoogleIcon";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";

const SignupSection = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const handleGoogleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    auth?.signinWithGoogle("/dashboard");
  };
  const handleEmailLogin = async (ev: any) => {
    ev.preventDefault();
    console.log(ev.currentTarget?.email);
    console.log(ev.currentTarget?.password);
  };
  return (
    <div className="max-w-[346px] w-full mx-auto pt-28 lg:pt-72 border-gray-700">
      <div className="flex justify-around">
        <div className="flex items-center">
          <Image
            className=""
            src="/assets/miniminds_1.png"
            height={93}
            priority={false}
            width={93}
            alt=""
          />
          <h3 className="text-[24px] font-semibold leading-[29px] text-primary_gray">
            MiniMinds
          </h3>
        </div>
      </div>
      <p className="mx-auto font-medium text-[12px] leading-[15px] text-center text-primary_gray">
        Helping educators and students to improve their memory and cognitive
        skills through fun and engaging gameplay.
      </p>
      <div>
        <label
          htmlFor="emailId"
          className="flex flex-col leading-[19px] "
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          name="emailId"
          id="emailId"
          onChange={(e: any) => {
            setEmail(e.currentTarget.value);
          }}
          placeholder="teachername1.gmail.comp"
          className="bg-transparent border mt-2 border-black text-[#2E2C29] placeholder:text-[#2E2C29] px-4 py-3  leading-[19px] w-full rounded py"
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="password"
          className="flex flex-col leading-[19px] "
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e: any) => {
            setpassword(e.currentTarget.value);
          }}
          placeholder="********"
          className="bg-transparent border mt-2 border-black text-[#2E2C29] placeholder:text-[#2E2C29] px-4 py-3  leading-[19px] w-full rounded py"
        />
      </div>
      <button
        onClick={(e: any) => {
          e.preventDefault();
        }}
        className="rounded bg-primary leading-[19px] mt-5 font-semibold text-white border border-primary py-3 text-center flex-1 flex justify-center w-full"
      >
        Login
      </button>
      <div className="relative flex py-5 items-center">
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
        <GoogleIcon className="" />
        <p className="leading-[19px] font-semibold">
          Sign up with Google
        </p>
      </button>
    </div>
  );
};
export default SignupSection;
