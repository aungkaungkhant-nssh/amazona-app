import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
function SellerRoute({children}) {
 let userSignin = useSelector((state) => state.userSignin);
 let {userInfo} = userSignin;
 
 return userInfo && userInfo.isSeller ? children :  <Navigate to="/signin"/>
}

export default SellerRoute