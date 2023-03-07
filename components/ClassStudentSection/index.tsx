import { SyntheticEvent, useState } from "react";
import AddStudentModal from "../AddStudentModal";
import UploadCsvModal from "../UploadCsvModal";

const ClassStudentSection = ({ classId }: { classId: string }) => {
  const [students, setStudents] = useState<any[]>([]);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showUploadCsvModal, setShowUploadCsvModal] = useState(false);
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
        {students.length !== 0 ? (
          students.map((session, index) => {
            return <div key={index}>aefdadsf</div>;
          })
        ) : (
          <div className="text-center py-28">
            <p className="text-2xl">No Sessions!</p>
            <p className="text-xs text-gray-600">
              Create a new session by clicking on {`"`}new game{`"`}
            </p>
          </div>
        )}
      </div>
      <AddStudentModal
        classId={classId}
        onClose={() => {}}
        onSuccess={() => {}}
        setShowModal={setShowAddStudentModal}
        showModal={showAddStudentModal}
      />
      <UploadCsvModal
        classId={classId}
        onClose={() => { }}
        onSuccess={() => { }}
        setShowModal={setShowUploadCsvModal}
        showModal={showUploadCsvModal}
      />
    </div>
  );
};
export default ClassStudentSection;
