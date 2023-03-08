import { useRef, Fragment, SyntheticEvent, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { deleteStudentById, getStudentsById } from "@/utils/database";
import { useAuth } from "@/context/userContext";
import { BiLoader } from "react-icons/bi";
import CreateStudentModal from "../CreateStudentModal";
import { StudentType } from "@/utils/types";
import ConfirmationDialog from "../ConfimationDialog";
import classNames from "classnames";
import axios from "axios";
import { notification } from "antd";
import ExcelParser from "./excelParser";

export default function UploadCsvModal({
  onClose,
  showModal,
  setShowModal,
  onSuccess,
  classId,
}: {
  onClose: any;
  showModal: boolean;
  setShowModal: any;
  onSuccess: any;
  classId: string;
}) {
  const cancelButtonRef = useRef(null);
  const auth = useAuth();
  const [selectedStudents, setSelectedStudents] = useState<StudentType[]>([]);
  const [createStudentModal, setCreateStudentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<StudentType[]>([]);
  const [currentStudent, setCurrentStudent] = useState<StudentType>();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);


  const dataHandler = (data: any) => {
    console.log(data)
    setStudents(data)
  }
  const getStudents = async () => {
    if (!showModal) {
      return;
    }
    const res = await getStudentsById(auth?.user?.uid);
    setStudents(res);
  };

  useEffect(() => {
    getStudents();
  }, [showModal]);

  const onDeleteStudent = async (student: StudentType) => {
    const res = deleteStudentById(student.id);
    getStudents();
  };

  function downloadFile(fileUrl: string, fileName: string): void {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = fileUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(fileUrl)
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                <div className="flex shadow bg-white px-4 pt-5 pb-4 sm:p-4 sm:pb-4">
                  <h1 className="text-xl">Add Students</h1>
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
                    <div className="relative">
                      <button
                        onClick={(e: SyntheticEvent) => {
                          e.preventDefault();
                          const fileName = 'Students_Template.xlsx';
                          const fileUrl = `${window.location.origin}/assets/${fileName}`;
                          downloadFile(fileUrl, fileName);
                        }}
                        className=" absolute right-0 bottom-3 px-2 text-xs underline w-full max-w-[150px] text-blue-700"
                      >
                        Download template CSV
                      </button>
                      <ExcelParser dataHandler={dataHandler} />
                    </div>
                  </div>
                  {students.length !== 0 ? (
                    <ul className="my-4 h-44 overflow-y-scroll rounded-lg">
                      {students.map((student, index) => {
                        console.log(index)
                        return (
                          <li
                            key={index}
                            className="w-full items-center border border-gray-200 flex justify-between bg-gray-50 my-2 py-2 px-4 rounded-lg"
                          >
                            <h1>{student.name}</h1>
                            <div className="flex items-center gap-2">
                              <button
                                className="px-3 border py-1 border-green-600 rounded-lg bg-green-200 disabled:opacity-60 disabled:hover:cursor-not-allowed"
                                disabled={student.isVerified ? false : true}
                              >
                                Add Student
                              </button>
                              {!student.isVerified && (
                                <button
                                  onClick={async (e: SyntheticEvent) => {
                                    e.preventDefault();
                                    await axios
                                      .post(`${location.origin}/api/sendmail`, {
                                        name: student.name,
                                        parentmail: student.parentEmail,
                                        verifyLink: `${location.origin}/verify/${student.id}`,
                                      })
                                      .then((response) => {
                                        if (response.data.status) {
                                          notification.success({
                                            message:
                                              "Successfully sent verification mail!",
                                          });
                                        } else {
                                          notification.error({
                                            message: "Error! Try again.",
                                          });
                                        }
                                      })
                                      .catch((err: any) => { });
                                  }}
                                  className="px-3 cursor-pointer border py-1 border-yellow-400 rounded-lg bg-yellow-100"
                                >
                                  Resend Verification
                                </button>
                              )}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-red-600 cursor-pointer"
                                onClick={(e: SyntheticEvent) => {
                                  e.preventDefault();
                                  setCurrentStudent(student);
                                  setShowConfirmation(true);
                                }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div>

                      <div className="flex items-center border my-4 rounded-lg h-44 justify-center">
                        <div className="text-center">
                          <p className="text-2xl">No Students!</p>
                          <p className="text-xs text-gray-600">
                          Upload an excel file
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="py-3 sm:flex sm:flex-row-reverse">
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
                </div>
                <CreateStudentModal
                  onClose={() => { }}
                  onSuccess={() => {
                    getStudents();
                  }}
                  classId={classId}
                  setShowModal={setCreateStudentModal}
                  showModal={createStudentModal}
                />
                <ConfirmationDialog
                  onClose={() => {
                    setShowConfirmation(false);
                  }}
                  setShowModal={setShowConfirmation}
                  showModal={showConfirmation}
                  onConfirm={() => {
                    setShowConfirmation(false);
                    if (currentStudent) {
                      onDeleteStudent(currentStudent);
                    }
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
