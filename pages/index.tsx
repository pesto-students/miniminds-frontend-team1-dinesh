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
        <div className='w-full h-screen overflow-y-scroll lg:h-[1000px] bg-no-repeat bg-center lg:bg-[url("/assets/Rectangle_18.png")]'>
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
      </main>
    </>
  );
}
