import React, { useEffect,useState } from 'react';
import { useDispatch,useSelector  } from 'react-redux'
import { detailUser, updateUserProfile } from '../redux/user/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Loadingbox from '../components/LoadingBox';
import Messagebox from '../components/MessageBox';
import { USER_DELETE_RESET, USER_DETAIL_RESET } from '../redux/user/userType';

function ProfileScreen() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const {loading,error,user} = userDetails;
 
  const userProfileUpdate = useSelector(state => state.userProfileUpdate);
  const {loading:updateLoading,error:updateError,success:successUpdate}= userProfileUpdate;

  let userSignin = useSelector((state)=> state.userSignin);
  let {userInfo} = userSignin;
 
  useEffect(()=>{
        if(!user ){
            
            dispatch(detailUser(userInfo.id));
        }else{
            setName(user.name);
            setEmail(user.email);
        }
    
  },[dispatch,user,userInfo.id]);
  
  useEffect(()=>{
    dispatch({type:USER_DETAIL_RESET})
  },[])
  
  
  const updateSumbitHandler = (e)=>{
      e.preventDefault();
      if(password !== confirmPassword){
         alert("Password And Confirm password are not match")
      }else{
          dispatch(updateUserProfile({name,email,password}))
      }
  }
  return (
    <div>
        <form className="form" onSubmit={updateSumbitHandler}>
            <div>
                <h1>User Profile</h1>
            </div>
            {updateLoading && (<Loadingbox />) }
            {updateError && (<Messagebox variant="danger">{updateError}</Messagebox>)}
            {successUpdate && (<Messagebox variant="success">Profile Updated Successfully</Messagebox>)}
            
            {
                loading ? (<LoadingBox />)
                :error ?  (<MessageBox variant="danger">{error}</MessageBox>)
                :(
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text"  placeholder="Enter Name" value={name}  onChange={e => setName(e.target.value)}/>
                        </div> 
                        <div>
                            <label htmlFor="name">Email</label>
                            <input type="email"  placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div> 
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password"  placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}/>
                        </div> 
                        <div>
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password"  placeholder="Confirm Password"  value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                        </div> 
                        <div>
                            <label />
                            <button className="primary" type="submit">
                                Update
                            </button>
                        </div>
                    </>
                )
            }
        </form>
    </div>
  )
}

export default ProfileScreen