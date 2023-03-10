import { useRef, Fragment, SyntheticEvent, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  deleteStudentById,
  getGames,
  getStudentById,
  updateClassById,
} from "@/utils/database";
import { useAuth } from "@/context/userContext";
import { BiLoader } from "react-icons/bi";
import CreateStudentModal from "../CreateStudentModal";
import { StudentType } from "@/utils/types";
import ConfirmationDialog from "../ConfimationDialog";
import axios from "axios";
import { notification } from "antd";
import Image from "next/image";

export default function NewGameModal({
  onClose,
  showModal,
  setShowModal,
  onSuccess,
  classId,
  studentsIds,
}: {
  onClose: any;
  showModal: boolean;
  setShowModal: any;
  onSuccess: any;
  classId: string;
  studentsIds: string[];
}) {
  const cancelButtonRef = useRef(null);
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [games, setGames] = useState<any[]>([]);

  const getStudents = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const data: any[] = [];
    for (let index = 0; index < studentsIds.length; index++) {
      const element = studentsIds[index];
      const studentdata = await getStudentById(element);
      data.push(studentdata);
    }
    setIsLoading(false);
    console.log(data);
    setStudents(data);
  };

  const getGamesData = async () => {
    if (!showModal || isLoading) {
      return;
    }
    setIsLoading(true);
    const res = await getGames();
    setGames(res);
    setIsLoading(false);
  };

  useEffect(() => {
    getGamesData();
    getStudents();
  }, [showModal]);

  const handleOnSave = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    // const data = selectedStudents.map((item, index) => {
    //   return item.id;
    // });
    // const res = await updateClassById(classId, {
    //   students: data,
    // });
    // console.log(res);
    // notification.success({ message: "Successfully added the students!" });
    // setIsLoading(false);
    // setShowModal(false);
    // onSuccess();
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
                  <h1 className="text-xl">New Game</h1>
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
                    <label
                      htmlFor="games"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Games
                    </label>
                    <select
                      id="games"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Choose a game</option>
                      {games.map((game, index) => {
                        return (
                          <option value={game?.name} key={index}>
                            {game?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {students.length !== 0 ? (
                    <div className="my-4">
                      <label
                        htmlFor="students"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select Student
                      </label>
                      <select
                        id="students"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>Choose a game</option>
                        {students.map((student, index) => {
                          return (
                            <option value={student?.name} key={index}>
                              {student?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : (
                    <div className="">
                      <div className="text-center text-red-600 font-semibold">Add students to class to create a session</div>
                    </div>
                  )}
                  <div className="py-3 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      onClick={handleOnSave}
                      className="inline-flex w-full justify-center rounded-md border border-green-600 bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {isLoading && (
                        <BiLoader className="animate-spin w-5 h-5 mr-2" />
                      )}
                      Save
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
                </div>
                <ConfirmationDialog
                  onClose={() => {
                    setShowConfirmation(false);
                  }}
                  setShowModal={setShowConfirmation}
                  showModal={showConfirmation}
                  onConfirm={() => {
                    setShowConfirmation(false);
                  }}
                  title="Deactivate user"
                  description="Are you sure you want to deactivate this account? All
        data will be permanently removed. This action
        cannot be undone."
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
