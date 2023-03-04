import { useAuth } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

const Sidebar = () => {
  const auth = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <nav className="sm:hidden border shadow-sm border-b-2 py-2 px-4 items-center flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onClick={(e: SyntheticEvent) => {
            e.preventDefault();
            setShowMenu(!showMenu);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <Link href="/" passHref className="text-center mx-auto">
          <h3 className="text-[24px] font-[600] leading-[29px] text-black">
            MiniMinds
          </h3>
        </Link>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-7 h-7 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg> */}
      </nav>
      {showMenu && (
        <ul className="mx-2  my-2 border shadow-md rounded-lg py-2 px-2 sm:hidden block">
          <li className="">
            <Link
              href="/dashboard"
              className="flex  items-center p-2 text-base font-normal transition duration-75 text-gray-800  rounded-lg hover:bg-gray-900 group"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 transition duration-75 group-hover:text-gray-100"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3 group-hover:text-gray-100 transition duration-75">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center text-gray-800 hover:bg-gray-700 hover:text-gray-200  p-2 text-base font-normal rounded-lg transition duration-75 group"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-gray-100"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="ml-3 group-hover:text-gray-100">Help</span>
            </a>
          </li>
          <li>
            <button
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();
                auth?.signout();
              }}
              className="text-gray-800 hover:text-gray-200 flex p-2 w-full rounded-lg transition duration-75 hover:bg-gray-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 group-hover:text-gray-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <span className="ml-3 group-hover:text-gray-100">Logout</span>
            </button>
          </li>
        </ul>
      )}
      <aside className="w-72 h-screen sm:block hidden">
        <div className="py-5 px-3 flex flex-col justify-between h-full bg-gray-800 border-r border-gray-700">
          <ul className="space-y-2">
            <li>
              <Image
                className="mx-auto text-center"
                src="/assets/miniminds_1.png"
                height={190}
                width={190}
                alt=""
              />
              <h3 className="text-[24px] font-[600] leading-[29px] text-center mx-auto text-white">
                MiniMinds
              </h3>
            </li>
            <li className="">
              <Link
                href="/dashboard"
                className="flex mt-8 items-center p-2 text-base font-normal text-gray-400  rounded-lg hover:bg-gray-700 group"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 transition duration-75 group-hover:text-gray-100"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3 group-hover:text-gray-100">
                  Dashboard
                </span>
              </Link>
            </li>
          </ul>
          <div className="pb-8 w-full">
            <button
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();
                auth?.signout();
              }}
              className="text-gray-400 hover:text-gray-200 flex p-2 w-full rounded-lg transition duration-75 hover:bg-gray-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 group-hover:text-gray-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <span className="ml-3 group-hover:text-gray-100">Logout</span>
            </button>
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-500">
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-400 hover:bg-gray-700 hover:text-gray-200  p-2 text-base font-normal rounded-lg transition duration-75 group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-100"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-3 group-hover:text-gray-100">Help</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
