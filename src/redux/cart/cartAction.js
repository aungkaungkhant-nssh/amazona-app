import  Axios  from "axios"
import { CART_ADD_ITEM, CART_FAIL } from "./cartType";

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