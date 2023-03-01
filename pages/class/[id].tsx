import Seo from "@/components/Seo";
import Sidebar from "@/components/SideBar";
import { getClassDataById } from "@/utils/database";
import { SyntheticEvent } from "react";

const ClassPage = (props: any) => {
  const { data } = props;
  return (
    <div className="flex w-full text-black">
      <Seo />
      <Sidebar />
      <div className="min-h-full max-w-7xl w-full">
        <header className="">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
            <div>
              <h1 className="text-3xl mt-16 font-bold tracking-tight text-gray-900">
                <span className="text-sm text-gray-400">class: </span>
                {data?.name}
              </h1>
              <h3 className="">
                <span className="text-sm text-gray-400">division: </span>
                {data?.division}
              </h3>
            </div>
            <button
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();
              }}
              className="bg-[#28B03D] gap-2 items-center flex transition duration-75 hover:bg-[#1f802e]  text-white rounded-lg mt-14 px-4 py-3"
            >
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
            </button>
          </div>
        </header>
        <main>
          <div className="mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="justify-items-center sm:grid-cols-2 grid gap-8 lg:grid-cols-3"></div>
            </div>
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
  console.log(res);

  return {
    props: {
      data: res,
    }, // will be passed to the page component as props
  };
}
