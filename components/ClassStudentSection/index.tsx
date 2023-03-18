import { getStudentById } from "@/utils/database";
import { StudentType } from "@/utils/types";
import { SyntheticEvent, useEffect, useState } from "react";
import AddStudentModal from "../AddStudentModal";
import UploadCsvModal from "../UploadCsvModal";

const ClassStudentSection = ({
  classId,
  studentsIds,
  updateStudent,
}: {
  classId: string;
  studentsIds: any[];
  updateStudent: any;
}) => {
  const [students, setStudents] = useState<any[]>(studentsIds);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showUploadCsvModal, setShowUploadCsvModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const getStudents = async () => {
  //   if (isLoading) {
  //     return;
  //   }
  //   setIsLoading(true);
  //   const data: any[] = [];
  //   for (let index = 0; index < studentsIds.length; index++) {
  //     const element = studentsIds[index];
  //     const studentdata = await getStudentById(element);
  //     data.push(studentdata);
  //   }
  //   setIsLoading(false);
  //   console.log(data);
  //   setStudents(data);
  // };

  // useEffect(() => {
  //   getStudents();
  // }, []);
  return (
    <div className="w-full px-8 py-8 border border-gray-300 rounded-lg">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Students</h1>
        <div className="space-x-2">
          <button
            onClick={(e: SyntheticEvent) => {
              e.preventDefault();
              setShowAddStudentModal(!showAddStudentModal);
            }}
            className="bg-[#28B03D] text-sm text-white px-4 py-2 rounded-lg"
          >
            + Add Student
          </button>
          <button
            onClick={(e: SyntheticEvent) => {
              e.preventDefault();
              setShowUploadCsvModal(!showUploadCsvModal);
            }}
            className="bg-[#28B03D] text-sm text-white px-4 py-2 rounded-lg"
          >
            Upload CSV
          </button>
        </div>
      </div>
      <div className="border rounded-lg mt-4">
        {studentsIds.length !== 0 ? (
          <ul className="my-4 rounded-lg">
            {studentsIds.map((student, index) => {
     

              return (
                <li
                  key={index}
                  className="w-auto mx-8 items-center border border-gray-200 flex justify-between bg-gray-50 my-2 py-2 px-4 rounded-lg"
                >
                  <h1>{student.name}</h1>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e: SyntheticEvent) => {
                        e.preventDefault();
                      }}
                      className="px-3 border py-1 border-red-600 rounded-lg bg-red-300 disabled:opacity-60 disabled:hover:cursor-not-allowed"
                      disabled={student.isVerified ? false : true}
                    >
                      Remove
                    </button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-red-600 cursor-pointer"
                      onClick={(e: SyntheticEvent) => {
                        e.preventDefault();
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
          <div className="text-center py-28">
            <p className="text-2xl">No Students!</p>
            <p className="text-xs text-gray-600">
              Create a new session by clicking on {`"`}new game{`"`}
            </p>
          </div>
        )}
      </div>
      <AddStudentModal
        classId={classId}
        onClose={() => {}}
        onSuccess={() => {
          updateStudent();
        }}
        setShowModal={setShowAddStudentModal}
        showModal={showAddStudentModal}
      />
      <UploadCsvModal
        classId={classId}
        onClose={() => {}}
        onSuccess={() => {}}
        setShowModal={setShowUploadCsvModal}
        showModal={showUploadCsvModal}
      />
    </div>
  );
};
export default ClassStudentSection;
