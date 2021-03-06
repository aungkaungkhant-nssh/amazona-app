import Axios from "axios";
import { PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL } from "./productType"

export const listProducts = ()=>{
    return dispatch =>{
        dispatch({
            type:PRODUCT_LIST_REQUEST
        })
      
        Axios.get('/api/products')
        .then((res)=>{
            dispatch({
                type:PRODUCT_LIST_SUCCESS,
                payload:res.data
            })
        })
        .catch((error)=>{
            dispatch({type:PRODUCT_LIST_FAIL,payload:error.message})
        })
    }
}

export const detailProduct =(productId) => async(dispatch)=>{
        
        dispatch({
            type:PRODUCT_DETAIL_REQUEST
        })
        try{
           let  {data} = await Axios.get(`/api/products/${productId}`);
           dispatch({
               type:PRODUCT_DETAIL_SUCCESS,
               payload:data
           })
        }catch(err){
          
            dispatch({
                type:PRODUCT_DETAIL_FAIL,
                payload:err.response && err.response.data.message || err.message
            })
        }
        
}   


export const createProduct = () => async(dispatch,getState)=>{
    dispatch({type:PRODUCT_CREATE_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();

        let {data} = await Axios.post(`/api/products`,{},{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({type:PRODUCT_CREATE_SUCCESS,payload:data})
    }catch(err){
        dispatch({
            type:PRODUCT_CREATE_FAIL,
            payload:err.response && err.response.data.message || err.message
        })
    }
}

export const updateProduct = (id,updateProduct) => async(dispatch,getState)=>{
    dispatch({type:PRODUCT_UPDATE_REQUEST});
    try{
        let {userSignin:{userInfo}} = getState();
        let {data} = await Axios.put(`/api/products/${id}`,updateProduct,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        })
        dispatch({type:PRODUCT_UPDATE_SUCCESS,payload:data});
    }catch(err){
        dispatch({
            type:PRODUCT_UPDATE_FAIL,
            payload:err.response && err.response.data.message || err.message
        })
    }
}
