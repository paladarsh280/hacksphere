import React, { useState } from "react";

export default function CollaboratorInput({ emails, setEmails }) {
  const [input, setInput] = useState("");

  const addEmail = () => {
    if (!input.includes("@")) return;
    if (emails.includes(input)) return;
    setEmails([...emails, input]);
    setInput("");
  };

  const removeEmail = (i) =>
    setEmails(emails.filter((_, x) => x !== i));

  return (
    <div>
      <input
        type="email"
        value={input}
        placeholder="Collaborator email"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addEmail();
          }
        }}
        className="w-full border p-2 rounded"
      />

      <div className="mt-2 flex flex-wrap gap-2">
        {emails.map((email, i) => (
          <span key={i} className="bg-blue-100 px-3 py-1 rounded-full">
            {email}
            <button
              type="button"
              onClick={() => removeEmail(i)}
              className="ml-2 text-red-500"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
