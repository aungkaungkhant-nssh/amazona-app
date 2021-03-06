import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET} from "./productType";

const productInitialState={
    loading:false,
    products:[],
    error:null
};
export const productListReducer = (state = productInitialState,action)=>{
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

export const productDetailReducer=(state= {},action)=>{
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return {loading:true}
        case PRODUCT_DETAIL_SUCCESS:
            return {loading:false,product:action.payload}
        case PRODUCT_DETAIL_FAIL:
            return {loading:false,error:action.payload}
        default:return state;
    }
}

export const productCreateReducer = (state={},action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading:true};
        case PRODUCT_CREATE_SUCCESS:
            return {loading:false,success:true,product:action.payload};
        case PRODUCT_CREATE_FAIL:
            return {loading:false,error:action.payload};
        case PRODUCT_CREATE_RESET:
            return {};
        default : return state;
    }
}

export const productUpdateReducer = (state={},action)=>{
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading:true};
        case PRODUCT_UPDATE_SUCCESS:
            return {loading:false,success:true};
        case PRODUCT_UPDATE_FAIL:
            return {loading:false,error:action.payload};
        case PRODUCT_UPDATE_RESET:
            return {};
        default : return state;
    }
}