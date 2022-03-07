import {ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL,ORDER_CREATE_RESET, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET, ORDER_HISTORY_REQUEST, ORDER_HISTORY_FAIL,ORDER_HISTORY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,ORDER_LIST_RESET, ORDER_DELETE_SUCCESS, ORDER_DELETE_REQUEST, ORDER_DELETE_FAIL,ORDER_DELETE_RESET, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_RESET, ORDER_SUMMARY_REQUEST, ORDER_SUMMARY_SUCCESS, ORDER_SUMMARY_FAIL} from './orderType'

export const orderCreateReducer = (state = {},action) =>{
    switch(action.type){
       case ORDER_CREATE_REQUEST:
           return {loading:true};
       case ORDER_CREATE_SUCCESS:
           return {loading:false,success:true,order:action.payload};
       case ORDER_CREATE_FAIL:
           return {loading:false,error:action.payload}
       case ORDER_CREATE_RESET:
           return {};
       default : return state;
    }
}

export const orderDetailsReducer = (state ={loading:true,order:{}},action)=>{
    switch(action.type){
        case ORDER_DETAIL_REQUEST:
            return {loading:true};
        case ORDER_DETAIL_SUCCESS:
            return {loading:false,order:action.payload};
        case ORDER_DETAIL_FAIL:
            return {loading:false,error:action.payload};
        default : return state;
    }
}
export const orderPayReducer =(state = {loading:true,success:false},action)=>{
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {loading:true};
        case ORDER_PAY_SUCCESS:
            return {loading:false,success:true};
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_PAY_RESET:
            return {};
        default:return state;
    }
}
export const orderHistoryReducer = (state ={loading:true,orders:[]},action)=>{
    switch(action.type){
        case ORDER_HISTORY_REQUEST:
            return {loading:true};
        case ORDER_HISTORY_SUCCESS:
            return {loading:false,orders:action.payload};
        case ORDER_HISTORY_FAIL:
            return {loading:false,error:action.payload};
        default :return state;
    }
}

export const orderListReducer = (state = {loading:true},action)=>{
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return {loading:true};
        case ORDER_LIST_SUCCESS:
            return {loading:false,orders:action.payload};
        case ORDER_LIST_FAIL:
            return {loading:false,error:action.payload};
        case ORDER_LIST_RESET:
            return {};
        default : return state;

    }
}

export const orderDeleteReducer = (state = {loading:false},action)=>{
    switch(action.type){
        case ORDER_DELETE_REQUEST:
            return {loading:true};
        case ORDER_DELETE_SUCCESS:
            return {loading:false,success:true};
        case ORDER_DELETE_FAIL:
            return {loading:false,error:action.payload};
        case ORDER_DELETE_RESET:
            return {};
        default : return state;
    }
}

export const orderDeliverReducer = (state = {loading:false},action)=>{
    switch(action.type){
        case ORDER_DELIVER_REQUEST:
            return {loading:true};
        case ORDER_DELIVER_SUCCESS:
            return {loading:false,success:true};
        case ORDER_DELIVER_FAIL:
            return {loading:false,error:action.payload};
        case ORDER_DELIVER_RESET:
            return {};
        default : return state;
    }
}

export const orderSummaryReducer = (state = {loading:true},action)=>{
    switch(action.type){
        case ORDER_SUMMARY_REQUEST:
            return {loading:true};
        case ORDER_SUMMARY_SUCCESS:
            return {loading:false,summary:action.payload};
        case ORDER_SUMMARY_FAIL:
            return {loading:false,error:action.payload};
        default : return state;
    }
}