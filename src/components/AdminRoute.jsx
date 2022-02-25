import React from 'react'
import { Navigate } from 'react-router-dom';
function AdminRoute({children}) {
  const {userSignin} = useSelector(state => userSignin);
  const {userInfo} = userSignin;
  return  userInfo.isAdmin ? children : <Navigate to="/signin"/> 
}

export default AdminRoute