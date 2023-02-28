import GetStartedSection from "@/components/GetStartedSection";
import LoginSection from "@/components/LoginSection";
import Seo from "@/components/Seo";
import Head from "next/head";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <Seo />
      <main>
        <div className='w-full h-screen overflow-y-scroll lg:h-[1000px] bg-no-repeat bg-center lg:bg-[url("/assets/Rectangle_18.png")]'>
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
        </div>
      </main>
    </>
  );
}
