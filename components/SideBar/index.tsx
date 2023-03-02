import { useAuth } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent } from "react";

const Sidebar = () => {
  const auth = useAuth();
  return (
    <>
      <aside className="w-72 h-screen sm:block hidden">
        <div className="py-5 px-3 flex flex-col justify-between h-full bg-white border-r border-gray-300 dark:bg-gray-800 dark:border-gray-700">
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
                className="flex mt-8 items-center p-2 text-base font-normal text-black hover:text-gray-200 rounded-lg dark:text-white hover:bg-gray-700 group"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-600 hover:text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-100 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            {/* <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-pages"
                data-collapse-toggle="dropdown-pages"
              >
                <svg
                  viewBox="0 0 25 26"
                  fill="currentColor"
                  className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.7585 0C8.36386 0.00950585 5.10261 1.29859 2.6483 3.601V1.3C2.6483 0.955219 2.5088 0.624558 2.26047 0.380761C2.01214 0.136964 1.67534 0 1.32415 0C0.972965 0 0.636162 0.136964 0.387835 0.380761C0.139508 0.624558 0 0.955219 0 1.3V7.15C0 7.49478 0.139508 7.82544 0.387835 8.06924C0.636162 8.31304 0.972965 8.45 1.32415 8.45H7.28284C7.63403 8.45 7.97083 8.31304 8.21916 8.06924C8.46748 7.82544 8.60699 7.49478 8.60699 7.15C8.60699 6.80522 8.46748 6.47456 8.21916 6.23076C7.97083 5.98696 7.63403 5.85 7.28284 5.85H4.10487C5.31211 4.59811 6.81741 3.66049 8.48534 3.12148C10.1533 2.58247 11.9315 2.45898 13.6601 2.76211C15.3887 3.06525 17.0135 3.7855 18.3882 4.85809C19.7629 5.93067 20.8445 7.32193 21.5356 8.90673C22.2268 10.4915 22.5058 12.2201 22.3476 13.9371C22.1894 15.654 21.5989 17.3054 20.6293 18.7427C19.6597 20.18 18.3414 21.3581 16.7929 22.1711C15.2445 22.984 13.5144 23.4063 11.7585 23.4C11.4073 23.4 11.0705 23.537 10.8222 23.7808C10.5738 24.0246 10.4343 24.3552 10.4343 24.7C10.4343 25.0448 10.5738 25.3754 10.8222 25.6192C11.0705 25.863 11.4073 26 11.7585 26C15.2703 26 18.6384 24.6304 21.1216 22.1924C23.6049 19.7544 25 16.4478 25 13C25 9.55219 23.6049 6.24558 21.1216 3.80761C18.6384 1.36964 15.2703 0 11.7585 0ZM11.7585 7.8C11.4073 7.8 11.0705 7.93696 10.8222 8.18076C10.5738 8.42456 10.4343 8.75522 10.4343 9.1V13C10.4343 13.3448 10.5738 13.6754 10.8222 13.9192C11.0705 14.163 11.4073 14.3 11.7585 14.3H14.4068C14.758 14.3 15.0948 14.163 15.3431 13.9192C15.5914 13.6754 15.7309 13.3448 15.7309 13C15.7309 12.6552 15.5914 12.3246 15.3431 12.0808C15.0948 11.837 14.758 11.7 14.4068 11.7H13.0826V9.1C13.0826 8.75522 12.9431 8.42456 12.6948 8.18076C12.4465 7.93696 12.1097 7.8 11.7585 7.8Z" />
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  History
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-pages"
                data-collapse-toggle="dropdown-pages"
              >
                <svg
                  className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  viewBox="0 0 26 18"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M25.2775 8.18086C24.1309 1.86343 21.5672 0 20.2035 0C18.0754 0 17.5293 1.56076 13.0001 1.61334C8.47078 1.56076 7.92477 0 5.79664 0C4.43291 0 1.86797 1.86343 0.721346 8.18086C0.0674343 11.7872 -0.642378 17.171 1.04895 17.8173C3.15369 18.6214 3.8674 16.6105 6.17884 14.9113C8.52538 13.1889 9.6512 12.7836 13.0001 12.7836C16.3489 12.7836 17.4747 13.1889 19.8213 14.9113C22.1327 16.6092 22.8464 18.6214 24.9512 17.8173C26.6425 17.171 25.9327 11.7884 25.2775 8.18086ZM7.79997 9.00036C7.1104 9.00036 6.44906 8.73012 5.96146 8.24911C5.47386 7.76809 5.19993 7.11569 5.19993 6.43542C5.19993 5.75516 5.47386 5.10276 5.96146 4.62174C6.44906 4.14072 7.1104 3.87049 7.79997 3.87049C8.48955 3.87049 9.15088 4.14072 9.63848 4.62174C10.1261 5.10276 10.4 5.75516 10.4 6.43542C10.4 7.11569 10.1261 7.76809 9.63848 8.24911C9.15088 8.73012 8.48955 9.00036 7.79997 9.00036ZM16.9001 9.00036C16.5553 9.00036 16.2247 8.86524 15.9809 8.62473C15.7371 8.38422 15.6001 8.05802 15.6001 7.71789C15.6001 7.37776 15.7371 7.05156 15.9809 6.81105C16.2247 6.57054 16.5553 6.43542 16.9001 6.43542C17.2449 6.43542 17.5756 6.57054 17.8194 6.81105C18.0632 7.05156 18.2002 7.37776 18.2002 7.71789C18.2002 8.05802 18.0632 8.38422 17.8194 8.62473C17.5756 8.86524 17.2449 9.00036 16.9001 9.00036ZM19.5002 6.43542C19.1554 6.43542 18.8247 6.30031 18.5809 6.0598C18.3371 5.81929 18.2002 5.49309 18.2002 5.15296C18.2002 4.81282 18.3371 4.48662 18.5809 4.24611C18.8247 4.0056 19.1554 3.87049 19.5002 3.87049C19.845 3.87049 20.1756 4.0056 20.4194 4.24611C20.6632 4.48662 20.8002 4.81282 20.8002 5.15296C20.8002 5.49309 20.6632 5.81929 20.4194 6.0598C20.1756 6.30031 19.845 6.43542 19.5002 6.43542Z"
                  />
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  History
                </span>
              </button>
            </li> */}
            {/* <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-sales"
                data-collapse-toggle="dropdown-sales"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Sales
                </span>
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-sales" className="hidden py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li> */}
            {/* <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
                <span className="inline-flex justify-center items-center w-5 h-5 text-xs font-semibold rounded-full text-primary-800 bg-primary-100 dark:bg-primary-200 dark:text-primary-800">
                  6
                </span>
              </a>
            </li> */}
            {/* <li>
              <button
                type="button"
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-authentication"
                data-collapse-toggle="dropdown-authentication"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Authentication
                </span>
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-authentication"
                className="hidden py-2 space-y-2"
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Sign In
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Sign Up
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Forgot Password
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
          <div className="pb-8 w-full bg-white dark:bg-gray-800">
            <button
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();
                auth?.signout();
              }}
              className="text-black hover:text-gray-200 flex p-2 w-full rounded-lg transition duration-75 hover:bg-gray-700 dark:hover:bg-gray-700 dark:text-white group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <span className="ml-3">Logout</span>
            </button>
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-500 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="flex items-center text-black hover:bg-gray-700 hover:text-gray-200  p-2 text-base font-normal rounded-lg transition duration-75 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-200 dark:group-hover:text-white"
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
                  <span className="ml-3">Help</span>
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
