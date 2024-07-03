"use client";
import React, { useState } from "react";
import socket from "../components/connect";
import { useRouter, useSearchParams } from "next/navigation";

function Joinroom() {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get("username");

  function joinRoom() {
    console.log(`Room ${roomName} joined`);
    socket.emit("join-room", roomName);
    router.push(`/Chatroom?user=${user}&room=${roomName}`);
  }

  return (
    <>
      <div>
        <div className="flex justify-center items-center text-center border-2 border-black rounded-lg h-11">
          <h6 className="font-serif font-semibold rounded-lg text-pretty text-2xl ">
            {user}
          </h6>
        </div>
        <div className="flex flex-wrap items-center justify-center p-2 m-4 ">
          <h4 className="flex flex-wrap items-center justify-center">
            join room
          </h4>
          <input
            className="p-2 m-2 text-black bg-gray-300 shadow-md rounded-xl w-1/8 "
            style={{ border: "1px solid black" }}
            placeholder="room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button
            className="p-2 m-2 font-semibold text-white bg-blue-600 w-28 hover:bg-blue-900 rounded-2xl "
            onClick={() => joinRoom()}
          >
            join
          </button>
        </div>
      </div>
    </>
  );
}

export default Joinroom;
