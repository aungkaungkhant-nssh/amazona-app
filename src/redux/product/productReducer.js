import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_RESET, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CATEGORY_LIST_FAIL,PRODUCT_CREATE_REVIEW_REQUEST,PRODUCT_CREATE_REVIEW_SUCCESS,PRODUCT_CREATE_REVIEW_FAIL,PRODUCT_CREATE_REVIEW_RESET} from "./productType";

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
            return {loading:false,products:[...action.payload.products],error:null,page:action.payload.page,pages:action.payload.pages}
        case PRODUCT_LIST_FAIL:
            return {loading:false,products:[],error:action.payload}
        default:return state;
    }
}

export const productDetailReducer=(state= {loading:true},action)=>{
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

export const productDeleteReducer = (state = {},action)=>{
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading:true};
        case PRODUCT_DELETE_SUCCESS:
            return {loading:false,success:true};
        case PRODUCT_DELETE_FAIL:
            return {loading:false,error:action.payload};
        case PRODUCT_DELETE_RESET:
            return {};
        default : return state;
    }
}

export const productListCategoriesReducer = (state= {loading:true},action)=>{
    switch(action.type){
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return {loading:true};
        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return {loading:false,categories:action.payload};
        case PRODUCT_CATEGORY_LIST_FAIL:
            return {loading:false,error:action.payload};
        default : return state;
    }
}

export const productCreateReviewReducer = (state={},action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
             return {loading:true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading:false,success:true,review:action.payload};
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading:false,error:action.payload};
        case PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default: return state;
    }
}