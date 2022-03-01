import { combineReducers } from "redux";
import {productListReducer,productDetailReducer, productCreateReducer, productUpdateReducer, productDeleteReducer} from "./product/productReducer";
import { cartReducer } from "./cart/cartReducer";
import { userDeleteReducer, userDetailsReducer, userListReducer, userSignInReducer, userSignUpReducer, userUpdateProfileReducer, userUpdateReducer } from "./user/userReducer";
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderHistoryReducer, orderListReducer, orderPayReducer } from "./order/orderReducer";
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
    productUpdate:productUpdateReducer,
    productDelete:productDeleteReducer,
    orderList : orderListReducer,
    orderDelete:orderDeleteReducer,
    orderDeliver:orderDeliverReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer
})

export default rootReducer;