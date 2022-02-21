import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPINGE_ADDRESS ,CART_EMPTY} from "./cartType";

const cartInitialState={
    cartItems:
        localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
    ,
    shippingAddress:
        localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        :{},
    paymentMethod:""
    
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
                    cartItems:state.cartItems.map((c)=> c.product === existItem.product ? item:c)
                }
            }else{
                return {...state,cartItems:[...state.cartItems,item]}
            }
        case CART_REMOVE_ITEM:
                return {
                    ...state,
                    cartItems:state.cartItems.filter((c)=>c.product!==action.payload)
                }
        case CART_SAVE_SHIPPINGE_ADDRESS:
                return {
                    ...state,
                    shippingAddress:action.payload
                }
        case CART_SAVE_PAYMENT_METHOD :
                return {
                    ...state,
                    paymentMethod:action.payload
                }
        case CART_EMPTY:
            return { ...state, cartItems: [] };
            
        default:return state;
    }
}