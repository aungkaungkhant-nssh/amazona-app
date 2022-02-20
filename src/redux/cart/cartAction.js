import  Axios  from "axios"
import { CART_ADD_ITEM, CART_FAIL, CART_REMOVE_ITEM,CART_SAVE_SHIPPINGE_ADDRESS } from "./cartType";

export const addToCart =(id,qty)=> async(dispatch,getState)=>{
    
    try{
        const {data} = await Axios.get(`/api/products/${id}`);
        dispatch({
            type:CART_ADD_ITEM,
            payload:{
                name:data.name,
                image:data.image,
                product:data._id,
                price:data.price,
                numberInstock:data.numberInstock,
                qty,
            }
        })
    }catch(err){
        console.log(err)
        dispatch({type:CART_FAIL, payload:err.response && err.response.data.message || err.message})
    }
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

export const removeToCart = (id) => async(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => async(dispatch)=>{
    dispatch({
        type:CART_SAVE_SHIPPINGE_ADDRESS,
        payload:data
    })
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}