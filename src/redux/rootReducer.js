import { combineReducers } from "redux";
import productReducer from "./product/productReducer";

const rootReducer = combineReducers({
    productList:productReducer
})

export default rootReducer;