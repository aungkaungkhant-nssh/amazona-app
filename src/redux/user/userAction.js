import  Axios  from "axios";
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,USER_SIGNIN_FAIL, USER_SIGNOUT, USER_SIGNUP_REQUEST, USER_SIGNUP_FAIL, USER_SIGNUP_SUCCESS, USER_DETAIL_REQUEST, USER_DETAIL_FAIL, USER_DETAIL_SUCCESS, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_DELETE_REQUEST, USER_DELETE_FAIL, USER_DELETE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS } from "./userType"

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
export const detailUser = (id)=> async(dispatch,getState)=>{
    dispatch({type:USER_DETAIL_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();
        let {data} = await Axios.get(`/api/users/${id}`,{
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

export const updateUserProfile = (user)=> async(dispatch,getState)=>{
    dispatch({type:USER_UPDATE_PROFILE_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();
        let {data} = await Axios.put(`/api/users/profile`,user,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:USER_UPDATE_PROFILE_SUCCESS,payload:data});
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data})
        localStorage.setItem("userInfo",JSON.stringify(data));
    }catch(err){
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:err.response && err.response.data.message || err.message
        });
    }
}

export const listUser = () => async(dispatch,getState)=>{
    dispatch({type:USER_LIST_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();
        let {data} = await Axios.get("/api/users",{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        });
        dispatch({type:USER_LIST_SUCCESS,payload:data});
    }catch(err){
        dispatch({
            type:USER_LIST_FAIL,
            payload:err.response && err.response.data.message || err.message
        });
    }
}

export const deleteUser = (id) => async(dispatch,getState)=>{
    dispatch({type:USER_DELETE_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();
        let {data} = await Axios.delete(`/api/users/${id}`,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:USER_DELETE_SUCCESS,payload:data});
    }catch(err){
        dispatch({
            type:USER_DELETE_FAIL,
            payload:err.response && err.response.data.message || err.message
        });
    }
}

export const updateUser = (id,user) => async(dispatch,getState)=>{
    dispatch({type:USER_UPDATE_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();
      
        let {data} = await Axios.put(`/api/users/${id}`,user,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:USER_UPDATE_SUCCESS,payload:data});
    }catch(err){
        dispatch({
            type:USER_UPDATE_FAIL,
            payload:err.response && err.response.data.message || err.message
        });
    }
}