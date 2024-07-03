
import React, { useEffect, useMemo, useState } from 'react'
import socket from './components/connect';



//const socket = io('http://localhost:8000');
function App() {
  //const socket = useMemo(()=>io("http://localhost:8000"),[])
  // const [socket,setSocket] = useState("");
  // setSocket(io("http://localhost:8000"))

  // const [message, setMessage]=useState("");
  // const [room, setRoom] = useState("");
  // const [socketID, setSocketID] = useState("");
  // const [messages, setMessages]= useState([]);
 // const [roomName, setRoomName]=useState("");

  


  // const handleSubmit=(e)=>{
  //   e.preventDefault();
  //   socket.emit("message",{message,room});
  //   setMessage("");
  //   setRoom("");

  // }

  //const socket = io("http://localhost:8000");
  //useEffect(() => {
    //const [socket,setSocket]=useState(null);
   // useEffect(()=>{
      //const newSocket=io("http://localhost:8000") 
      //setSocket(newSocket)

      
    //  socket.on("receive-message",(data)=>{
    //   console.log(data);
    //   setMessages((messages)=>[...messages,data]);

    //  })

    
      //return socket.disconnect()

      // return ()=>{
      //   socket.disconnect();
      // };
   // },[]);

    
  
  return (


    <>
    {/* <h1>{socket.id}</h1> */}

    
    {/* <form onSubmit={handleSubmit} >
        <input
        type="text"
        placeholder='enter message'
        className='w-full'
        label="Message"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        >
        </input>
        <input
        type="text"
        placeholder='enter key'
        className='w-full'
        label="room"
        value={room}
        onChange={(e)=>setRoom(e.target.value)}
        >
        </input>
        <button type ="submit" className='bg-gray-600 hover:bg-gray-800 rounded-lg w-20 m-2 text-center text-semibold'>send message</button>
         
    </form> */}
    
    {/* <Stack> */}
      {/* {
        messages.map((m,i)=>(
          <p key ={i}>{m}</p>
        ))
      } */}

    {/* </Stack> */}
    
    </>

    

    
   
  )
}

export default App