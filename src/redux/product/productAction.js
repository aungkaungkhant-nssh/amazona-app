import Axios from "axios";
import { PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "./productType"

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
            console.log(err.response)
            dispatch({
                type:PRODUCT_DETAIL_FAIL,
                payload:err.response && err.response.data.message || err.message
            })
        }
        
}   