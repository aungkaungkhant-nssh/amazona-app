import  Axios  from "axios";
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,USER_SIGNIN_FAIL, USER_SIGNOUT, USER_SIGNUP_REQUEST, USER_SIGNUP_FAIL, USER_SIGNUP_SUCCESS, USER_DETAIL_REQUEST, USER_DETAIL_FAIL, USER_DETAIL_SUCCESS } from "./userType"

export const signin = (email,password) => async(dispatch)=>{
    
    dispatch({type:USER_SIGNIN_REQUEST});
    try{
        let {data} = await Axios.post('/api/users/signin',{email,password});
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data));
    }catch(err){
    
        dispatch({
            type:USER_SIGNIN_FAIL,
            payload:err.response && err.response.data.message || err.message
        })
    }
}

export const signup =(name,email,password)=>async(dispatch)=>{
    dispatch({type:USER_SIGNUP_REQUEST});
    try{
        let {data} = await Axios.post('/api/users/signup',{name,email,password})
        dispatch({type:USER_SIGNUP_SUCCESS,payload:data});
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data));
    }catch(err){
        
        dispatch({
            type:USER_SIGNUP_FAIL,
            payload:err.response && err.response.data.message || err.message
        });
    }
}

export const signout = ()=> async(dispatch,getState)=>{
    localStorage.removeItem("cartItems");
    getState().cart.cartItems=[];
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress")
    dispatch({type:USER_SIGNOUT});   
}
export const detailUser = ()=> async(dispatch,getState)=>{
    dispatch({type:USER_DETAIL_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();
        let {data} = await Axios.get('/api/users/details',{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:USER_DETAIL_SUCCESS,payload:data})
    }catch(err){
        dispatch({
            type:USER_DETAIL_FAIL,
            payload:err.response && err.response.data.message || err.message
        });
    }
}