import  Axios  from "axios"
import { CART_ADD_ITEM, CART_FAIL, CART_REMOVE_ITEM,CART_SAVE_SHIPPINGE_ADDRESS,CART_SAVE_PAYMENT_METHOD, CART_ADD_ITEM_FAIL } from "./cartType";

export const addToCart =(id,qty)=> async(dispatch,getState)=>{
    
    try{
        let {cart:{cartItems}} = getState();
        const {data} = await Axios.get(`/api/products/${id}`);
        if(cartItems.length > 0 && cartItems[0].seller._id!==data.seller._id){
            dispatch({
                type:CART_ADD_ITEM_FAIL,
                payload: `Can't Add To Cart. Buy only from ${cartItems[0].seller.seller.name} in this order`,
            })
            return;
        }
        dispatch({
            type:CART_ADD_ITEM,
            payload:{
                name:data.name,
                image:data.image,
                product:data._id,
                price:data.price,
                numberInstock:data.numberInstock,
                qty,
                seller:data.seller
            }
        })
    }catch(err){
        console.log(err)
        dispatch({type:CART_FAIL, payload:err.response && err.response.data.message || err.message})
    }
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

export const removeToCart = (id) => async(dispatch,getState)=>{
    console.log(id)
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems.filter((c)=>c.product!==id)))
}

export const saveShippingAddress = (data) => (dispatch)=>{
    dispatch({
        type:CART_SAVE_SHIPPINGE_ADDRESS,
        payload:data
    })
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}

export const savePaymentMethod = (data)=>(dispatch)=>{

    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data
    })
}