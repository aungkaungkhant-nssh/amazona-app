import React, { useState,useEffect } from 'react'
import {useSelector} from 'react-redux'
import {io} from 'socket.io-client';
const ENDPOINT= window.location.host.indexOf('localhost') >= 0
? 'http://127.0.0.1:5000'
: window.location.host;
function ChatBox() {
  const [isOpen,setIsOpen] = useState(false);
  let [messages,setMessages] = useState([
      {name:"Admin",body:"Hello there please ask your question!"}
  ]);
  let [messageBody,setMessageBody]= useState("");
  let [socket,setSocket] = useState(null);
  let userSignin = useSelector((state)=>state.userSignin);
  let {userInfo} = userSignin;
  let [offline,setOffline] = useState(false);
  useEffect(() => {
     if(socket){
         if(!offline){
            socket.emit("onLogin",{
                _id:userInfo.id,
                name:userInfo.name,
                isAdmin:userInfo.isAdmin
             })
         }
         
         socket.on("message",(message)=>{
             setMessages([...messages,message]);
         })
     }
  }, [socket,messages,isOpen]);

  const supportHandler= (e)=>{
      setIsOpen(true);
      setOffline(false);
      let sk = io(ENDPOINT);
      setSocket(sk);
  }
  const closeHandler = (e)=>{
      setIsOpen(false);
      setOffline(true);
      socket.emit("onLogout",{_id:userInfo.id});
  }
  const  submitHandler = (e)=>{
      e.preventDefault();
      setMessages([...messages,{name:userInfo.name,body:messageBody}]);
      setMessageBody("");
      socket.emit("onMessage",{
          _id:userInfo.id,
          name:userInfo.name,
          body:messageBody,
          isAdmin:userInfo.isAdmin
      })
  }
  return (
    <div className="chatbox">
        {
            !isOpen ? (
                <button type="button" onClick={supportHandler}>
                    <i className="fa-solid fa-message"></i>
                </button>
            ):(
                <div className="card card-body">
                    <div className="row">
                        <strong>Support</strong>
                        <button type="button" onClick={closeHandler}>
                            <i className="fas fa-close"></i>
                        </button>
                    </div>
                    <ul>
                        {
                            messages.map((message,index)=>(
                               <li key={index}>
                                    <strong>{`${message.name} :`}</strong>{message.body}
                               </li>
                            ))
                        }
                    </ul>
                    <div>
                        <form className="row" onSubmit={submitHandler}>
                            <input type="text" value={messageBody} onChange={(e)=>setMessageBody(e.target.value)} />
                            <button type="submit">send</button>
                        </form>
                    </div>
                </div>
            )
        }
    </div>

  )
}

export default ChatBox