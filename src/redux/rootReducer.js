import { combineReducers } from "redux";
import {productListReducer,productDetailReducer, productCreateReducer, productUpdateReducer} from "./product/productReducer";
import { cartReducer } from "./cart/cartReducer";
import { userDetailsReducer, userSignInReducer, userSignUpReducer, userUpdateProfileReducer } from "./user/userReducer";
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
    userDetails:userDetailsReducer,
    userProfileUpdate:userUpdateProfileReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer
})

export default rootReducer;