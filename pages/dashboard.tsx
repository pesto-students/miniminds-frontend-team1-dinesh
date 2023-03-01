import Sidebar from "@/components/SideBar";
import { SyntheticEvent, useState } from "react";
import Seo from "@/components/Seo";
import CreateClass from "@/components/CreateClass";

const Dashboard = () => {
  const [showCreateClass, setShowCreateClass] = useState(false);
  return (
    <div className="flex w-full">
      <Seo />
      <Sidebar />
      <div className="min-h-full max-w-7xl w-full">
        <header className="">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl mt-16 font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <button
              onClick={(e: SyntheticEvent) => {
                e.preventDefault();
                setShowCreateClass(!showCreateClass);
              }}
              className="bg-[#28B03D] transition duration-75 hover:bg-[#1f802e]  text-white rounded-lg mt-14 px-4 py-3"
            >
              + Create Class
            </button>
          </div>
        </header>
        <main>
          <div className="mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
      <CreateClass
        onClose={() => {}}
        onSuccess={() => {}}
        setShowModal={setShowCreateClass}
        showModal={showCreateClass}
      />
    </div>
  );
};
export default Dashboard;
