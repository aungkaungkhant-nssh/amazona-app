import { CART_ADD_ITEM } from "./cartType";

const cartInitialState={
    cartItems:
        localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
    ,
    
};

export const cartReducer = (state = cartInitialState,action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            let item = action.payload;
            let existItem = state.cartItems.find((c) => c.product===item.product);

            if(existItem){
                existItem.qty+=item.qty;
                return{
                    ...state,
                    cartItems:state.cartItems.map((c)=> c.product === existItem.product ?existItem:c)
                }
            }else{
                return {...state,cartItems:[...state.cartItems,item]}
            }
        default:return state;
    }
}