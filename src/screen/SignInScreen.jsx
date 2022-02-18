import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SigninScreen = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    return (
        <div>
            <form action="" className="form">
                <div>
                    <h1>Sign In</h1>
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
                    <button className="block primary">Sign in</button>
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
