import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams} from 'react-router';
import { detailUser, updateUser } from '../redux/user/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {  USER_DETAIL_RESET, USER_UPDATE_RESET } from '../redux/user/userType';

function UserEditScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const {loading,error,user} = userDetails;
  const userUpdate = useSelector((state)=> state.userUpdate);
  const {loading:updatedLoading,error:updatedError,success:updatedSuccess}=userUpdate;

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [isAdmin,setisAdmin] = useState("");
  const [isSeller,setisSeller] = useState(""); 

  const navigate =  useNavigate();
  useEffect(()=>{
      if(updatedSuccess){
        dispatch({type:USER_UPDATE_RESET});
        navigate(`/userlist`)
      }
      if(!user){
        dispatch(detailUser(params.id));
      }else{
        setName(user.name);
        setEmail(user.email);
        setisAdmin(user.isAdmin);
        setisSeller(user.isSeller);
      }
  },[user,params.id,dispatch,updatedSuccess]);

  useEffect(()=>{
    dispatch({type:USER_DETAIL_RESET})
  },[]);

  const updateHandler = (e)=>{
    e.preventDefault();
    dispatch(updateUser(params.id,{name,email,isAdmin,isSeller}));
  }
  return (
    <div>
      <form action="" className="form" onSubmit={updateHandler}>
        <div>
            <h1>Edit User {name}</h1>
        </div>
        {
          loading ? ( <LoadingBox /> )
          :error ? (  <MessageBox variant="danger">{error}</MessageBox> )
          :(
            <>
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Enter name" value={name}  onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Enter email" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div>
                <label htmlFor="">Is Seller</label>
                <input type="checkbox" checked={isSeller} onChange={(e)=>setisSeller(e.target.checked)}/>
              </div>
              <div>
                <label htmlFor="">Is Admin</label>
                <input type="checkbox" checked={isAdmin} onChange={(e)=>setisAdmin(e.target.checked)}/>
              </div>
              <div>
                  <button type="submit" className="small primary" >Update</button>
              </div>
            </>
          )
        }
      </form>
    </div>
  )
}

export default UserEditScreen