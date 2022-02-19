import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';

import {Link,useNavigate,useSearchParams
} from 'react-router-dom'
import { signup } from '../redux/user/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox'
function SignUpScreen() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setconfirmPassword]= useState("");
  const dispatch = useDispatch();
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo,error,loading} = userSignin;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirect = searchParams.get("redirect") ? "/"+searchParams.get("redirect") :"/";

  const submitHandler =(e)=>{
      e.preventDefault();
      if(password == confirmPassword){
        dispatch(signup(name,email,password))
      }else{
          alert("Password and confirm Password not match")
      }
      
  }

  useEffect(()=>{
    if(userInfo){
        navigate(redirect)
    }
  },[redirect,navigate,userInfo])
  return (
    <div>
         { loading && <LoadingBox />  }
        { error && <MessageBox variant="danger">{error}</MessageBox>}
        <form  className="form" onSubmit={submitHandler}>
                <div>
                    <h1>New Account</h1>
                </div>
               
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" id="confirm_password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)}/>
                </div>
                <div>
                    <button className="block primary" type
                    ="submit">Sign up</button>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <div>
                        Already have an accound ? <Link to={`/signin?redirect=${redirect.split('/')[1]}`}>Sign In</Link>
                    </div>
                </div>
            </form>
    </div>
  )
}

export default SignUpScreen