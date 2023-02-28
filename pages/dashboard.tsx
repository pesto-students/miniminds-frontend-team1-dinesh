import Sidebar from "@/components/SideBar";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const Dashboard = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="min-h-full max-w-7xl w-full">
        <header className="">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-3xl mt-16 font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <button className="bg-[#28B03D] transition duration-75 hover:bg-[#1f802e]  text-white rounded-lg mt-14 px-4 py-3">+ Create Class</button>
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
    </div>
  );
};
export default Dashboard;
