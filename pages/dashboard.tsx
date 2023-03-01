import Sidebar from "@/components/SideBar";
import { SyntheticEvent, useEffect, useState } from "react";
import Seo from "@/components/Seo";
import CreateClass from "@/components/CreateClass";
import { getClassesById } from "@/utils/database";
import { useAuth } from "@/context/userContext";
import { notification } from "antd";
import { ClassType } from "@/utils/types";

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
  }, [auth?.user]);

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
                  return (
                    <div
                      key={index}
                      className="h-full flex flex-col justify-between py-7 px-4 min-h-[285px] w-full max-w-[381px] bg-green-200 rounded-md"
                    >
                      <div>
                        <h1 className="font-semibold text-[24px] leading-[24px]">
                          {value.name}
                        </h1>
                        <h3 className="font-normal text-sm leading-[24px]">
                          {value?.division}
                        </h3>
                      </div>
                      <div className="flex border-t-2 pt-2 justify-between items-center border-gray-800">
                        <h4 className="text-sm">30 Students</h4>
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.1229 11C9.91125 11 10.6819 10.7654 11.3374 10.3259C11.9929 9.88635 12.5038 9.26164 12.8055 8.53074C13.1071 7.79983 13.1861 6.99556 13.0323 6.21964C12.8785 5.44372 12.4988 4.73098 11.9414 4.17157C11.384 3.61216 10.6737 3.2312 9.90052 3.07686C9.12732 2.92252 8.32588 3.00173 7.59754 3.30448C6.8692 3.60723 6.24667 4.11992 5.80869 4.77772C5.37071 5.43552 5.13693 6.20888 5.13693 7C5.13693 8.06087 5.55688 9.07828 6.3044 9.82843C7.05191 10.5786 8.06576 11 9.1229 11ZM9.1229 5C9.51707 5 9.9024 5.1173 10.2301 5.33706C10.5579 5.55683 10.8133 5.86918 10.9642 6.23463C11.115 6.60009 11.1545 7.00222 11.0776 7.39018C11.0007 7.77814 10.8109 8.13451 10.5322 8.41422C10.2534 8.69392 9.89831 8.8844 9.51171 8.96157C9.12511 9.03874 8.72439 8.99914 8.36022 8.84776C7.99605 8.69639 7.68479 8.44004 7.4658 8.11114C7.2468 7.78224 7.12992 7.39556 7.12992 7C7.12992 6.46957 7.33989 5.96086 7.71365 5.58579C8.0874 5.21072 8.59433 5 9.1229 5ZM17.0948 13C17.6861 13 18.2641 12.8241 18.7557 12.4944C19.2473 12.1648 19.6305 11.6962 19.8567 11.1481C20.083 10.5999 20.1422 9.99667 20.0269 9.41473C19.9115 8.83279 19.6268 8.29824 19.2087 7.87868C18.7906 7.45912 18.2579 7.1734 17.678 7.05765C17.0981 6.94189 16.4971 7.0013 15.9508 7.22836C15.4046 7.45543 14.9377 7.83994 14.6092 8.33329C14.2807 8.82664 14.1054 9.40666 14.1054 10C14.1054 10.7957 14.4203 11.5587 14.981 12.1213C15.5416 12.6839 16.302 13 17.0948 13ZM17.0948 9C17.2919 9 17.4846 9.05865 17.6485 9.16853C17.8123 9.27841 17.94 9.43459 18.0155 9.61732C18.0909 9.80004 18.1106 10.0011 18.0722 10.1951C18.0337 10.3891 17.9388 10.5673 17.7995 10.7071C17.6601 10.847 17.4825 10.9422 17.2892 10.9808C17.0959 11.0194 16.8956 10.9996 16.7135 10.9239C16.5314 10.8482 16.3758 10.72 16.2663 10.5556C16.1568 10.3911 16.0983 10.1978 16.0983 10C16.0983 9.73479 16.2033 9.48043 16.3902 9.2929C16.5771 9.10536 16.8305 9 17.0948 9ZM17.0948 14C15.9905 14.0012 14.918 14.3706 14.0456 15.05C13.0695 14.0744 11.8274 13.4106 10.476 13.1424C9.12449 12.8743 7.72414 13.0137 6.45153 13.5431C5.17892 14.0726 4.09103 14.9683 3.32506 16.1174C2.55908 17.2665 2.14932 18.6175 2.14746 20C2.14746 20.2652 2.25245 20.5196 2.43933 20.7071C2.6262 20.8946 2.87967 21 3.14395 21C3.40824 21 3.6617 20.8946 3.84858 20.7071C4.03546 20.5196 4.14044 20.2652 4.14044 20C4.14044 18.6739 4.66538 17.4022 5.59977 16.4645C6.53416 15.5268 7.80147 15 9.1229 15C10.4443 15 11.7116 15.5268 12.646 16.4645C13.5804 17.4022 14.1054 18.6739 14.1054 20C14.1054 20.2652 14.2103 20.5196 14.3972 20.7071C14.5841 20.8946 14.8376 21 15.1018 21C15.3661 21 15.6196 20.8946 15.8065 20.7071C15.9934 20.5196 16.0983 20.2652 16.0983 20C16.1007 18.8284 15.8058 17.6755 15.2414 16.65C15.6817 16.3008 16.2112 16.083 16.7691 16.0217C17.327 15.9603 17.8909 16.0578 18.3962 16.303C18.9015 16.5482 19.3278 16.9312 19.6264 17.4081C19.9249 17.8851 20.0836 18.4368 20.0843 19C20.0843 19.2652 20.1893 19.5196 20.3762 19.7071C20.563 19.8946 20.8165 20 21.0808 20C21.3451 20 21.5985 19.8946 21.7854 19.7071C21.9723 19.5196 22.0773 19.2652 22.0773 19C22.0773 17.6739 21.5524 16.4022 20.618 15.4645C19.6836 14.5268 18.4163 14 17.0948 14Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                  );
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
