import axios from "axios";
import React from "react";
export default function EventUnlock() {
  const unlock = async (event) => {
    await axios.post(
      "https://hacksphere-e64m.onrender.com/api/memory/unlock-event",
      { eventName: event },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Memories unlocked 🎉");
  };

  return (
    <div>
      <button onClick={() => unlock("graduation")}>Graduation Done</button>
      <button onClick={() => unlock("wedding")}>Wedding Done</button>
    </div>
  );
}
