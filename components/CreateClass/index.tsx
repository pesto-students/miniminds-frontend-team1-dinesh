import { useRef, Fragment, SyntheticEvent, ChangeEvent, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { createClass } from "@/utils/database";
import { useAuth } from "@/context/userContext";
import { notification } from "antd";
import { BiLoader } from "react-icons/bi";

export default function CreateClass({
  onClose,
  showModal,
  setShowModal,
  onSuccess,
}: {
  onClose: any;
  showModal: boolean;
  setShowModal: any;
  onSuccess: any;
}) {
  const cancelButtonRef = useRef(null);
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    const data = {
      name: e.currentTarget?.classname?.value,
      division: e.currentTarget?.division?.value || "",
      createdBy: auth?.user.uid,
    };
    setIsLoading(true);
    const res = await createClass(data);
    if (res.id) {
      notification.success({ message: "Successfully created a class!" });
      setIsLoading(false);
      setShowModal(false);
      onSuccess();
    } else {
      setIsLoading(false);
      notification.error({ message: "Error! try again." });
    }
  };
  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 text-black"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-md">
                <div className="flex shadow bg-white px-4 pt-5 pb-4 sm:p-4 sm:pb-4">
                  <h1 className="text-xl">Create Class</h1>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="defaultModal"
                    onClick={(e: SyntheticEvent) => {
                      e.preventDefault();
                      setShowModal(false);
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="bg-white px-4">
                  <div className="my-4">
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 mb-4 sm:grid-cols-1">
                        <div>
                          <label
                            htmlFor="classname"
                            className="block mb-2 text-sm font-medium"
                          >
                            Class Name
                            <span>*</span>
                          </label>
                          <input
                            type="text"
                            name="classname"
                            id="classname"
                            className="bg-gray-50 border placeholder:text-gray-600 border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Enter class name"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 mb-4 sm:grid-cols-1">
                        <div>
                          <label
                            htmlFor="division"
                            className="block mb-2 text-sm font-medium"
                          >
                            Division
                            <span className="ml-2 text-gray-600 text-xs">
                              (optional)
                            </span>
                          </label>
                          <input
                            type="text"
                            name="division"
                            id="division"
                            className="bg-gray-50 border placeholder:text-gray-600 border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                            placeholder="Enter Division"
                          />
                        </div>
                      </div>
                      <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md border border-green-600 bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          {isLoading && (
                            <BiLoader className="animate-spin w-5 h-5 mr-2" />
                          )}
                          Create
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-600 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={(e: SyntheticEvent) => {
                            e.preventDefault();
                            setShowModal(false);
                            onClose();
                          }}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
