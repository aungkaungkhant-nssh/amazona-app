import Axios from "axios";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "./productType"

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