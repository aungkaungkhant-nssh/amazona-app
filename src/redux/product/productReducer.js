import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "./productType";

const productInitialState={
    loading:false,
    products:[],
    error:null
};
const productReducer = (state = productInitialState,action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true,products:[],error:null}
        case PRODUCT_LIST_SUCCESS:
            return {loading:false,products:[...action.payload],error:null}
        case PRODUCT_LIST_FAIL:
            return {loading:false,products:[],error:action.payload}
        default:return state;
    }
}

export default productReducer;