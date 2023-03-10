import { database } from "@/config/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";

const CreateSession = () => {
  const [sessionId, setSessionId] = useState("");

  const handleCreateSession = async () => {
    const sessionRef = await addDoc(collection(database, "games"), {});
    const sessionId = sessionRef.id;

    try {
      await setDoc(doc(database, "games", sessionId), {
        createdOn: serverTimestamp(),
        players: [],
        board: [],
      });
      setSessionId(sessionId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create Game Session</h1>
      <button onClick={handleCreateSession}>Create Session</button>
      {sessionId && (
        <div>
          <p>Session ID: {sessionId}</p>
          <p>
            Share this link with other players:{" "}
            {`${window.location.origin}/join/${sessionId}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateSession;
