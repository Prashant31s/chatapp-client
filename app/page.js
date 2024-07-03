"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import socket from "./components/connect";

export default function Home() {
  const [usernames, setUsernames] = useState([]);
  const [userName, setUsername] = useState("");
  const [takenName, setTakenName] = useState(true);

  const router = useRouter();

  function userjoin() {
    if (userName) {
      socket.emit("username", { userName });
      socket.on("approved username", () => {
        router.push(`./joinroom?username=${userName}`);
      });
      socket.on("duplicate username", (m) => {
        setTakenName(`username ${m.userName} is taken`);
      });
    }
  }
  useEffect(() => {
    console.log("userlen", usernames.length);
    console.log("USerNames usestate", usernames);
  }, [usernames]);

  return (
    <>
      <div className="flex flex-col justify-center h-screen p-3 m-2 mx-auto w-max">
        <input
          className="flex p-2 m-2"
          placeholder="username"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        {!takenName ? "" : <span className="p-2 text-wrap">{takenName}</span>}

        <button
          className="p-3 m-2 bg-green-500 hover:bg-green-800 w-44 border-l-green-700 rounded-2xl"
          onClick={() => userjoin()}
        >
          room chat
        </button>
      </div>
    </>
  );
}
