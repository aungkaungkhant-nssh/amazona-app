import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {io} from 'socket.io-client';
import MessageBox from '../components/MessageBox'
const ENDPOINT= window.location.host.indexOf('localhost') >= 0
? 'http://127.0.0.1:5000'
: window.location.host;

let allUsers = [];
let allMessages =[];
let allSelectedUser={};
function SupportScreen() {
  const [socket,setSocket] = useState(null);
  const userSignin = useSelector((state)=>state.userSignin);
  let {userInfo} = userSignin;
  let [users,setUsers] = useState([]);
  let [messages,setMessages] = useState([]);
  let [selectedUser,setSelectedUser] = useState({});
  let [messageBody,setMessageBody]=useState("");
  useEffect(()=>{
      if(!socket){
        let sk = io(ENDPOINT);
        setSocket(sk);
        sk.emit("onLogin",{
            _id:userInfo.id,
            name:userInfo.name,
            isAdmin:userInfo.isAdmin
        });
       
        sk.on("message",(message)=>{
          if(allSelectedUser._id === message._id){
            allMessages = [...allMessages,message];
          }else{
            let existUser = allUsers.find((x)=>x._id === message._id);
            if(existUser){
              allUsers = allUsers.map((x)=>(
                x._id === existUser._id ? {...x,unread:true} : x
              ))
              sk.emit("onUnReadMessage",existUser);
               setUsers(allUsers);
            }
          }
          
          setMessages(allMessages);
        })
        sk.on("updateUser",(updatedUser)=>{
         
          const existUser = allUsers.find((user) => user._id === updatedUser._id);
          if (existUser) {
            
             allUsers = allUsers.map((user) =>
              user._id === existUser._id ? {unread:user.unread,...updatedUser} : user
            );
            setUsers(allUsers);
          } else {
            allUsers = [...allUsers, updatedUser];
            setUsers(allUsers);
          }
          
        })
        sk.on("listUsers",(users)=>{
          allUsers = users;
          setUsers(allUsers);
         
        })
        sk.on("selectedUser",(selectUser)=>{
            allMessages = selectUser.messages;
            setMessages(allMessages);
           
        })
      }
  },[messages, socket,users]);

  const selectUser=(user)=>{
      allSelectedUser = user;
      setSelectedUser(allSelectedUser);
       let existUser = allUsers.find((x)=>x._id === user._id);
        if(existUser){
          allUsers = allUsers.map((x)=>(
            x._id === existUser._id ? {...x,unread:false} : x
          ))
          setUsers(allUsers);
          socket.emit("onReadMessage",existUser)
        }
      socket.emit("onSelectedUser",user)
  }
  let submitHandler = (e)=>{
    e.preventDefault();
    if(!messageBody.trim()){
      alert('Error. Please type message.');
    }else{
      allMessages=[...allMessages,{name:userInfo.name,body:messageBody}];
      setMessages(allMessages);
      setMessageBody("");
      let data ={
        _id:selectedUser._id,
        name:userInfo.name,
        isAdmin:userInfo.isAdmin,
        body:messageBody,
        
      }
      socket.emit("onMessage",data);
    }
    
  }
  return (
    <div className="row top full-container">
        <div className="col-1 support-users">
            {
              users.filter((x)=>(x._id !== userInfo.id)).length === 0 && (
                <MessageBox>No users online</MessageBox>
              )
            }
            <ul>
                {
                   users.filter((x)=>(x._id !== userInfo.id)).map((user)=>(
                     <li key={user._id}>
                        <button
                          className="block"
                          type="button"
                          onClick={() => selectUser(user)}
                        >
                          {user.name}
                        </button>
                        <span className={user.unread ? "unread" : user.online ? "online":"offline"}></span>
                     </li>
                   ))
                }
            </ul>
        </div>
        <div className="col-3 support-messages">
                {
                  !selectedUser._id ? (
                      <MessageBox>No selected user</MessageBox>
                  ):(
                    <div>
                        <div className="row">
                            <strong>Chat with {selectedUser.name}</strong>
                        </div>
                        <ul>
                            {messages.length === 0 && <li>No message</li>}
                            {
                              messages.map((message,index)=>(
                                <li key={index}>
                                    <strong>{`${message.name}:`}</strong>{message.body}
                                </li>
                              ))
                            }
                        </ul>
                        <div>
                          <form onSubmit={submitHandler} className="row">
                            <input
                              value={messageBody}
                              onChange={(e) => setMessageBody(e.target.value)}
                              type="text"
                              placeholder="type message"
                            />
                            <button type="submit">Send</button>
                          </form>
                        </div>
                    </div>
                  )
                }
            </div>
    </div>
  )
}

export default SupportScreen