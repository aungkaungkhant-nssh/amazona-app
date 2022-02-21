import { combineReducers } from "redux";
import {productListReducer,productDetailReducer} from "./product/productReducer";
import { cartReducer } from "./cart/cartReducer";
import { userSignInReducer, userSignUpReducer } from "./user/userReducer";
import { orderCreateReducer } from "./order/orderReducer";
const rootReducer = combineReducers({
    productList:productListReducer,
    productDetail:productDetailReducer,
    cart:cartReducer,
    userSignin:userSignInReducer,
    userSignup:userSignUpReducer,
    orderCreate:orderCreateReducer
})

export default rootReducer;