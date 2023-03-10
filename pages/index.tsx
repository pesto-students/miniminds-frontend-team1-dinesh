import GetStartedSection from "@/components/GetStartedSection";
import LoginSection from "@/components/LoginSection";
import Seo from "@/components/Seo";
import { useAuth } from "@/context/userContext";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    if (auth?.user) {
      router.push("/dashboard");
    }
  }, [auth?.user]);

  return (
    <>
      <Seo />
      <main>
        <div className="relative w-full h-screen overflow-hidden bg-[#F6FAF5]">
          <div className="absolute max-w-3xl mx-auto inset-x-0 top-1/2 -translate-y-1/2 hidden lg:block">
            <img src="/assets/background.png" alt="" />
          </div>
          <div className='relative w-full h-full'>
            <div className=" absolute max-w-max mx-auto inset-x-0 top-1/2 -translate-y-1/2">
              {isLoading ? (
                <>
                  <div className="text-2xl text-black text-center">Loading...</div>
                </>
              ) : (
                <>
                  {showLogin ? (
                    <LoginSection />
                  ) : (
                    <GetStartedSection
                      onClick={(e: SyntheticEvent) => {
                        e.preventDefault();
                        setShowLogin(true);
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
