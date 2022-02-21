import  Axios  from "axios";
import { CART_EMPTY } from "../cart/cartType";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS } from "./orderType"

export const createOrder = (order)=> async(dispatch,getState)=>{
  
    dispatch({type:ORDER_CREATE_REQUEST});
    try{
        const {userSignin:{userInfo}}=getState();
        console.log(userInfo.token)
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