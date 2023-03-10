import { getClassDataById, getSessionByClassId } from "@/utils/database";
import { notification } from "antd";
import { SyntheticEvent, useEffect, useState } from "react";
import NewGameModal from "../NewGameModal";

const NewGameSection = ({
  classId,
  students,
}: {
  classId: string;
  students: any[];
}) => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const getData = async () => {
    const res = await getSessionByClassId(classId);
    setSessions(res);
  };
  useEffect(() => {
    if (classId) {
      getData();
    }
  }, [classId]);
  return (
    <>
      <div className="w-full px-8 py-8 border border-gray-300 rounded-lg">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Sessions</h1>
          <button
            onClick={(e: SyntheticEvent) => {
              e.preventDefault();
              if (students.length !== 0) {
                setShowNewGameModal(true);
              } else {
                notification.error({
                  message: "Add student in clas to create a session!",
                });
              }
            }}
            className="bg-[#28B03D] text-sm text-white px-4 py-2 rounded-lg"
          >
            + New Game
          </button>
        </div>
        <div className="border rounded-lg mt-4">
          {sessions.length !== 0 ? (
            sessions.map((session, index) => {
              return (
                <div
                  key={index}
                  className="flex py-2 px-4 justify-between items-center"
                >
                  <div className="text-lg font-semibold">{index + 1}</div>
                  <div className="flex">
                    <button
                      onClick={(e: SyntheticEvent) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(
                          `${location.origin}/join/${session.id}`
                        );
                        notification.info({ message: "Copied to Clipboard" });
                      }}
                      className="border px-4 py-2 rounded-lg border-gray-600"
                    >
                      copy
                    </button>
                  </div>
                </div>
              );
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
      </div>
      <NewGameModal
        classId={classId}
        onClose={() => {}}
        onSuccess={() => {}}
        setShowModal={setShowNewGameModal}
        showModal={showNewGameModal}
        studentsIds={students}
      />
    </>
  );
};
export default NewGameSection;
