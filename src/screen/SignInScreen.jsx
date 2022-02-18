import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link,useNavigate,useSearchParams } from 'react-router-dom';
import { signin } from '../redux/user/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox'

const SigninScreen = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    
    const {userInfo,error,loading}=userSignin;
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect")? "/"+searchParams.get("redirect") :"/";
  
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(signin(email,password))
    }
    
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,userInfo,redirect])
    return (
        <div>
            <form  className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                { loading && <LoadingBox />  }
                { error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <button className="block primary" type
                    ="submit">Sign in</button>
                </div>
                <div>
                    <label htmlFor=""></label>
                    <div>
                        New customer? <Link to="/register">Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SigninScreen;
