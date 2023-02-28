import { useAuth } from "@/context/userContext";
import { GoogleIcon } from "@/utils/Icons/GoogleIcon";
import Image from "next/image";
import { SyntheticEvent } from "react";

const LoginSection = () => {
  const auth = useAuth();
  const handleGoogleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    auth?.signinWithGoogle("/dashboard");
  };
  return (
    <div className="max-w-[346px] w-full mx-auto pt-28 lg:pt-72 border-gray-700">
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
      <form className="mt-9">
        <div>
          <label className="flex flex-col text-[16px] leading-[19px] font-[400]">
            Email
          </label>
          <input
            type="text"
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
            placeholder="********"
            className="bg-transparent border mt-2 border-black text-[#2E2C29] placeholder:text-[#2E2C29] px-4 py-3 text-[16px] font-[400] leading-[19px] w-full rounded-[5px] py"
          />
        </div>
        <button className="rounded-[5px] bg-[#19B03D] leading-[19px] text-[16px] mt-5 font-[600] text-white border border-[#19B03D] py-3 text-center flex-1 flex justify-center w-full">
          Login
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
        <GoogleIcon className="" />
        <p className="leading-[19px] font-[600] text-[16px]">
          Login with Google
        </p>
      </button>
    </div>
  );
};
export default LoginSection;
