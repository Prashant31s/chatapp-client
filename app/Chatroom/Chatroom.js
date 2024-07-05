"use client";
import React, { useEffect, useState } from "react";
import socket from "../components/connect";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getRandomColor } from "../utils/colors";

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
  const [count, setCount] = useState(0);
  const [backgroundcolor, setbackgroundcolor] = useState("#000000");
  let x;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("message", { message, room, user });
    }

    setMessage("");
  };

  useEffect(() => {
    setbackgroundcolor(getRandomColor());
    x = socket.id;
    setSocketID(socket.id);
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log("jfbgehgfehg");
    });
    socket.emit("join-room", newroom);
    socket.on("history", (messageshistory) => {
      let mes = [];
      for (let i = 0; i < messageshistory.length ; i++) {
        //console.log("messagehistoryroom", messageshistory[i].nmessages,messageshistory[i].myroom, room);
        if(messageshistory[i].myroom==room){
          mes.push({
            nmessages: messageshistory[i].nmessages,
            ruser: messageshistory[i].ruser
          });
        }
        
      }
      setMesuser(mes);
      console.log("MesUser", mesuser ,mes);
    });
    socket.on("welcome", (s) => {});
  }, []);

  useEffect(() => {
    socket.on("receive-message", ({ message, user, messageshistory }) => {
      let mes = mesuser;
      mes.push({ nmessages: message, ruser: user });
      setMesuser(mes);
      setMessages((messages) => [...messages, message]);
      setReceiveuser(user);
    });
  }, [mesuser]);

  return (
    <div className="w-screen  bg-accent h-screen ">
      <div className="rounded-2xl items-center justify-center text-center text-2xl">
        <h1 className="p-2 m-1 text-heading">{user}</h1>

        <div className="flex flex-col justify-end border-[2.5px] border-white rounded-[30px] bg-black w-[50vw] min-w-[750 px] h-[90vh] mx-auto my-4 bg-background">
          <div className="flex flex-col-reverse p-3  mt-5 mr-2 overflow-auto  scrollbar-thin scrollbar-thumb-rounded-sm scrollbar-thumb-black">
            <div className="flex flex-col gap-3 p-2 ">
              {mesuser.map((msg, index) =>
                msg.ruser == user ? (
                  <div className="bg-primary flex flex-col self-end max-w-xs border-[1px] border-black rounded-[25px]">
                    {/* <div className="bg-secondary pl-2 pr-3 py-1 rounded-2xl shadow-md text-wrap word h-auto text-white "> */}
                    <p className="text-wrap m-1 p-1  word">{msg.nmessages}</p>
                    {/* </div> */}
                  </div>
                ) : (
                  <div
                    key={index}
                    className="bg-secondary flex flex-col  max-w-xs border-[1px] border-text rounded-[25px] w-fit "
                  >
                    <span
                      className={`pt-1 pl-1 pr-1 m-0.5 text-sm font-bold text-${getRandomColor} `}
                    >
                      {msg.ruser} :
                    </span>
                    <span className="m-0.5 bg-secondary pl-1 pr-1 pb-1 text-black rounded-2xl text-wrap word overflow-x-auto ">
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

            <button type="submit" className="">
              send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
