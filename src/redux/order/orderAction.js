import  Axios  from "axios";
import { CART_EMPTY } from "../cart/cartType";
import { 
    ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_HISTORY_FAIL, ORDER_HISTORY_REQUEST, ORDER_HISTORY_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS,ORDER_DELIVER_REQUEST,ORDER_DELIVER_SUCCESS,ORDER_DELIVER_FAIL, ORDER_SUMMARY_REQUEST, ORDER_SUMMARY_FAIL, ORDER_SUMMARY_SUCCESS } from "./orderType"

export const createOrder = (order)=> async(dispatch,getState)=>{
  
    dispatch({type:ORDER_CREATE_REQUEST});
    try{
        const {userSignin:{userInfo}}=getState();
        let {data} = await Axios.post('/api/orders',order,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        
        dispatch({type:ORDER_CREATE_SUCCESS,payload:data.order});
        dispatch({type:CART_EMPTY});
        localStorage.removeItem("cartItems");
    }catch(err){
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:err.response && err.response.data.message || err.message
        });
    }
}

export const detailsOrder = (orderId) => async(dispatch,getState)=>{
    dispatch({type:ORDER_DETAIL_REQUEST});
    try{
        const {userSignin:{userInfo}}=getState();
        let {data} = await Axios.get(`/api/orders/${orderId}`,{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({type:ORDER_DETAIL_SUCCESS,payload:data});
    }catch(err){
      
        dispatch({
            type:ORDER_DETAIL_FAIL,
            payload:err.response && err.response.data.message || err.message
        });
    }
}

export const payOrder = (payResult) => async(dispatch,getState)=>{
    
    dispatch({type:ORDER_PAY_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();
        let {data} = await Axios.put(`/api/orders/${payResult._id}/pay`,{...payResult,email_address:userInfo.email},{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:ORDER_PAY_SUCCESS,payload:data.order})
    }catch(err){
        dispatch({
            type:ORDER_PAY_FAIL,
            payload:err.response && err.response.data.message || err.message
        });
    }
}

export const historyOrder = () => async(dispatch,getState)=>{
    dispatch({type:ORDER_HISTORY_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();
        let {data} = await Axios.get('/api/orders/mine',{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        
        dispatch({type:ORDER_HISTORY_SUCCESS,payload:data})
    }catch(err){
        console.log(err.response.data.message)
        dispatch({type:ORDER_HISTORY_FAIL,payload:err.response && err.response.data.message || err.message})
    }
}

export const listOrder = (seller) => async(dispatch,getState)=>{
    dispatch({type:ORDER_LIST_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();
        let {data} = await Axios.get(`/api/orders?seller=${seller}`,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:ORDER_LIST_SUCCESS,payload:data})
    }catch(err){
        dispatch({
            type:ORDER_LIST_FAIL,
            payload:err.response && err.response.data.message || err.message
        })
    }
}

export const deleteOrder = (order) => async(dispatch,getState)=>{
    dispatch({type:ORDER_DELETE_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();
        let {data}= await Axios.delete(`/api/orders/${order._id}`,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:ORDER_DELETE_SUCCESS,payload:data});
    }catch(err){
        dispatch({
            type:ORDER_DELETE_FAIL,
            payload:err.response && err.response.data.message || err.message
        })
    }
}

export const deliverOrder= (orderId) => async(dispatch,getState)=>{
    dispatch({type:ORDER_DELIVER_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();
        let {data}= await Axios.put(`/api/orders/${orderId}/deliver`,{},{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:ORDER_DELIVER_SUCCESS,payload:data});
    }catch(err){
        dispatch({
            type:ORDER_DELIVER_FAIL,
            payload:err.response && err.response.data.message || err.message
        })
    }
}

export const summaryOrder = () => async(dispatch,getState)=>{
    dispatch({type:ORDER_SUMMARY_REQUEST})
    try{
        let {userSignin:{userInfo}} = getState();
        let {data} = await Axios.get('/api/orders/summary',{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:ORDER_SUMMARY_SUCCESS,payload:data})
    }catch(err){
        dispatch({
            type:ORDER_SUMMARY_FAIL,
            payload:err.response && err.response.data.message || err.message
        })
    }
}