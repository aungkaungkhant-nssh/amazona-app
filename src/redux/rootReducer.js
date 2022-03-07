import { combineReducers } from "redux";
import {productListReducer,productDetailReducer, productCreateReducer, productUpdateReducer, productDeleteReducer, productListCategoriesReducer, productCreateReviewReducer} from "./product/productReducer";
import { cartReducer } from "./cart/cartReducer";
import { userDeleteReducer, userDetailsReducer, userListReducer, userSignInReducer, userSignUpReducer, userTopSellerListReducer, userUpdateProfileReducer, userUpdateReducer } from "./user/userReducer";
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderHistoryReducer, orderListReducer, orderPayReducer, orderSummaryReducer } from "./order/orderReducer";
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
    userUpdate:userUpdateReducer,
    userTopSellerList:userTopSellerListReducer,
    productListCategories:productListCategoriesReducer,
    productCreateReview:productCreateReviewReducer,
    orderSummary:orderSummaryReducer
})

export default rootReducer;