"use client";
import React, { useEffect, useState } from "react";
import socket from "../components/connect";
import { useParams, useRouter, useSearchParams } from "next/navigation";

function Chatroom(data) {
  const [mesuser, setMesuser] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [socketID, setSocketID] = useState("");
  const [receiveuser, setReceiveuser] = useState("");
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  const newroom = searchParams.get("room");
  const [room, setRoom] = useState(newroom);
  let x;

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room, user });
    setMessage("");
  };

  useEffect(() => {
    x = socket.id;
    setSocketID(socket.id);
    socket.on("connect", () => {
      setSocketID(socket.id);
    });
    socket.on("receive-message", ({ message, user }) => {
   
      mesuser.push({
        nmessages: message,
        ruser: user,
      });
   
      console.log("aaaa", { user, message });
      setMessages((messages) => [...messages, message]);
      setReceiveuser(user);
    });

    socket.on("welcome", (s) => {
      //console.log(s);
    });
  }, []);

  return (
    <div className="w-screen bg-gray-800">
      <div className="chatbox">
        <h1 className="text-white">{user}</h1>

        <div className="flex flex-col justify-end border-2 border-blue-500 rounded-md bg-blue-300 w-[50vw] min-w-[750 px] h-[90vh] mx-auto my-4">
          <div className="flex flex-col-reverse overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-sm scrollbar-thumb-black">
            <div className="flex flex-col gap-3 p-3 ">
              {mesuser.map((msg, index) =>
                msg.ruser == user ? (
                  <div className="flex flex-col self-end max-w-xs border-2 border-blue-950 rounded-lg">
                    <div className="bg-blue-700 pl-2 pr-3 py-1 rounded-[4px] shadow-md text-wrap word h-auto ">
                      <p className="text-wrap">{msg.nmessages}</p>
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="flex flex-col  max-w-xs border-2 border-black rounded-md w-fit"
                  >
                    <span className={`pl-2 pr-3 text-sm font-bold`}>
                      {msg.ruser}
                    </span>
                    <span className="bg-gray-950 pl-2 text-white pr-3 py-1 rounded-4[px] text-wrap word overflow-x-auto">
                      {msg.nmessages}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="enter message"
              className="input"
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></input>

            <button
              type="submit"
              className="items-center justify-center h-10 m-2 text-center bg-gray-600 border-gray-800 rounded-lg hover:bg-gray-800 w-28 text-semibold"
            >
              send{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
