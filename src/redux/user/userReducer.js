import { USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "./userType";

const initialState={
    userInfo:localStorage.getItem("userInfo")
            ?JSON.parse(localStorage.getItem("userInfo"))
            :null
};
export const userSignInReducer =(state=initialState,action)=>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true};
        case USER_SIGNIN_SUCCESS:
            return {loading:false,userInfo:action.payload};
        case USER_SIGNIN_FAIL:
            return {loading:false,error:action.payload};
        case USER_SIGNOUT:
            return {loading:false,userInfo:null};
        default :return state;
    }
}
export const userSignUpReducer = (state=initialState,action)=>{
    switch(action.type){
        case USER_SIGNUP_REQUEST:
            return {loading:true};
        case USER_SIGNUP_SUCCESS:
            return {loading:false,userInfo:action.payload};
        case USER_SIGNUP_FAIL:
            return {loading:false,userInfo:null};
        default :return state;
    }
}

export const userDetailsReducer = (state = {loading:true,user:{}},action)=>{
    switch(action.type){
        case USER_DETAIL_REQUEST:
            return {loading:true};
        case USER_DETAIL_SUCCESS:
            return {loading:false,user:action.payload};
        case USER_DETAIL_FAIL:
            return {loading:false,user:{}};
        default :return state;
    }
}