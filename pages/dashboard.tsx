import Sidebar from "@/components/SideBar";
import { SyntheticEvent, useEffect, useState } from "react";
import Seo from "@/components/Seo";
import CreateClass from "@/components/CreateClass";
import { getClassesById } from "@/utils/database";
import { useAuth } from "@/context/userContext";
import { notification } from "antd";
import { ClassType } from "@/utils/types";
import ClassCard from "@/components/ClassCard";

const Dashboard = () => {
  const auth = useAuth();
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [isError, setIsError] = useState<{
    isError: boolean;
    message?: string;
  }>({
    isError: false,
    message: "",
  });
  const getClassesByIdList = async () => {
    console.log("asdfas");
    try {
      const res = await getClassesById(auth?.user.uid);
      setClasses(res);
    } catch (error) {
      setIsError({
        isError: true,
        message: "Error! try again",
      });
      notification.error({ message: "Error! try again" });
    }
  };
  useEffect(() => {
    if (auth?.user && !auth?.loading) {
      getClassesByIdList();
    }
  }, []);

  return (
    <div className="flex w-full text-black">
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
            <div className="px-4 py-6 sm:px-0">
              <div className="justify-items-center sm:grid-cols-2 grid gap-8 lg:grid-cols-3">
                {classes.map((value, index) => {
                  return <ClassCard data={value} key={index} />;
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
      <CreateClass
        onClose={() => {}}
        onSuccess={() => {
          getClassesByIdList();
        }}
        setShowModal={setShowCreateClass}
        showModal={showCreateClass}
      />
    </div>
  );
};
export default Dashboard;
