import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { deleteUser, listUser } from '../redux/user/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DELETE_RESET } from '../redux/user/userType';

function UserListScreen() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const {loading,error,users}= userList;
  
  const userDelete = useSelector((state) => state.userDelete);
  const {loading:deletedLoading,error:deletedError,success:deletedSuccess} = userDelete;

  useEffect(()=>{
    if(deletedSuccess){
        dispatch({type:USER_DELETE_RESET});
    }
    dispatch(listUser());
  },[deletedSuccess]);

  const deleteHandler = (id) => {
      dispatch(deleteUser(id));
  }
  return (
    <div>
        {
            loading ? ( <LoadingBox /> )
            : error ? ( <MessageBox variant="danger">{error}</MessageBox>)
            : (
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>IS SELLER</th>
                        <th>IS ADMIN</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isSeller ? "Yes" : "No"}</td>
                                <td>{user.isAdmin ? "Yes" : "No"}</td>
                                <td>

                                    <button>Edit</button>
                                    <button type="button" className="small"
                                    onClick={()=>deleteHandler(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            )
        }
       
    </div>
  )
}

export default UserListScreen