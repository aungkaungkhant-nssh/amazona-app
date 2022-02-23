import { combineReducers } from "redux";
import {productListReducer,productDetailReducer} from "./product/productReducer";
import { cartReducer } from "./cart/cartReducer";
import { userDetailsReducer, userSignInReducer, userSignUpReducer } from "./user/userReducer";
import { orderCreateReducer, orderDetailsReducer, orderHistoryReducer, orderPayReducer } from "./order/orderReducer";
const rootReducer = combineReducers({
    productList:productListReducer,
    productDetail:productDetailReducer,
    cart:cartReducer,
    userSignin:userSignInReducer,
    userSignup:userSignUpReducer,
    orderCreate:orderCreateReducer,
    orderDetail:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderHistory:orderHistoryReducer,
    userDetails:userDetailsReducer
})

export default rootReducer;