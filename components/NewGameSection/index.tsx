import { useState } from "react";

const NewGameSection = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  return (
    <div className="w-full px-8 py-8 border border-gray-300 rounded-lg">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Sessions</h1>
        <button className="bg-[#28B03D] text-sm text-white px-4 py-2 rounded-lg">
          + New Game
        </button>
      </div>
      <div className="border rounded-lg mt-4">
        {sessions.length !== 0 ? (
          sessions.map((session, index) => {
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
    </div>
  );
};
export default NewGameSection;
