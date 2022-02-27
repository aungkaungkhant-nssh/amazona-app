import  Axios  from "axios";
import { CART_EMPTY } from "../cart/cartType";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_HISTORY_FAIL, ORDER_HISTORY_REQUEST, ORDER_HISTORY_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "./orderType"

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

export const listOrder = () => async(dispatch,getState)=>{
    dispatch({type:ORDER_LIST_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();
        let {data} = await Axios.get('/api/orders',{
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