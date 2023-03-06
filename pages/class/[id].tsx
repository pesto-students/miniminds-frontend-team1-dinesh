import ClassStudentSection from "@/components/ClassStudentSection";
import NewGameSection from "@/components/NewGameSection";
import Seo from "@/components/Seo";
import Sidebar from "@/components/SideBar";
import { deleteClassById, getClassDataById } from "@/utils/database";
import { DeleteActiveIcon, DeleteInactiveIcon } from "@/utils/Icons";
import { TabState } from "@/utils/types";
import { Menu, Transition } from "@headlessui/react";
import { notification } from "antd";
import classNames from "classnames";
import { useRouter } from "next/router";
import { Fragment, SyntheticEvent, useState } from "react";

const ClassPage = (props: any) => {
  const { data } = props;
  const router = useRouter();
  const tabStates: TabState[] = ["New Game", "History", "Students"];
  const [tabState, setTabState] = useState<TabState>("New Game");
  return (
    <div className="block sm:flex w-full text-black">
      <Seo />
      <Sidebar />
      <div className="min-h-full max-w-7xl w-full">
        <header className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl mt-0 sm:mt-16 font-bold tracking-tight text-gray-900">
                <span className="text-sm text-gray-400">class: </span>
                {data?.name}
              </h1>
              <h3 className="">
                <span className="text-sm text-gray-400">division: </span>
                {data?.division}
              </h3>
            </div>
            <Menu as="div" className="mt-auto">
              <div>
                <Menu.Button className="bg-[#28B03D] h-12 gap-2 items-center flex transition duration-75 hover:bg-[#1f802e]  text-white rounded-lg mt-auto px-4 py-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                  Edit
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute mr-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={async (e: SyntheticEvent) => {
                            e.preventDefault();
                            await deleteClassById(data.id);
                            notification.success({
                              message: "Successfully deleted",
                            });
                            router.push("/dashboard");
                          }}
                          className="text-gray-900 hover:bg-green-200 group flex w-full items-center rounded-md px-2 py-2 text-sm"
                        >
                          {active ? (
                            <DeleteActiveIcon
                              className="mr-2 h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <DeleteInactiveIcon
                              className="mr-2 h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                          )}
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>
        <main>
          <div className="mx-auto pb-6 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0 mb-4 sm:mb-6">
              <div className="text-sm font-medium mx-auto text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex -mb-px">
                  {tabStates.map((item, index) => (
                    <li className="mr-2" key={index}>
                      <div
                        onClick={(e: SyntheticEvent) => {
                          e.preventDefault();
                          setTabState(item);
                        }}
                        className={classNames(
                          "inline-block cursor-pointer p-4 border-b-2 transition duration-300 ease-in-out border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",
                          item === tabState
                            ? "dark:text-blue-500 dark:border-blue-500 text-green-400 border-green-400 hover:text-green-500 hover:border-green-500"
                            : ""
                        )}
                      >
                        {item}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {tabState === "New Game" && <NewGameSection />}
            {tabState === "Students" && (
              <ClassStudentSection classId={data.id} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
export default ClassPage;

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const res = await getClassDataById(id);
  return {
    props: {
      data: res,
    },
  };
}
