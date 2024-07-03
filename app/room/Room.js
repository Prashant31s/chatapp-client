import React from 'react'
import Chatroom from '../Chatroom/Chatroom'


function Room() {

    // const [messages, setMessages]= useState([]);
    // const [message, setMessage]=useState("");
    // const [room, setRoom] = useState("");
    // const [socketID, setSocketID]=useState("");
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        socket.emit("message",{message,room});
        setMessage("");
       
    
    }
    
  return (
    <div>
    {/* <form>
        <input
        type="text"
        placeholder='enter message'
        className='w-full'
        label="Message"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        >
    </input>
    <button type ="submit" className='bg-gray-600 hover:bg-gray-800 rounded-lg w-28 h-10 m-2 text-center text-semibold'>send message</button>

    </form> */}
    <Chatroom />
    </div>
    
  )
}

export default Room