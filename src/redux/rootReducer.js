import { combineReducers } from "redux";
import {productListReducer,productDetailReducer} from "./product/productReducer";
import { cartReducer } from "./cart/cartReducer";
import { userSignInReducer, userSignUpReducer } from "./user/userReducer";
const rootReducer = combineReducers({
    productList:productListReducer,
    productDetail:productDetailReducer,
    cart:cartReducer,
    userSignin:userSignInReducer,
    userSignup:userSignUpReducer
})

export default rootReducer;