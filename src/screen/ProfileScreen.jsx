import React, { useEffect } from 'react';
import { useDispatch,useSelector  } from 'react-redux'
import { detailUser } from '../redux/user/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function ProfileScreen() {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const {loading,error,user} = userDetails;

  useEffect(()=>{
    dispatch(detailUser());
  },[]);
  
  return (
    <div>
        <form className="form">
            <div>
                <h1>User Profile</h1>
            </div>
            {
                loading ? (<LoadingBox />)
                :error ?  (<MessageBox variant="danger">{error}</MessageBox>)
                :(
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text"  placeholder="Enter Name" value={user.name} />
                        </div> 
                        <div>
                            <label htmlFor="name">Email</label>
                            <input type="email"  placeholder="Enter Email" value={user.email} />
                        </div> 
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password"  placeholder="Enter Password"  />
                        </div> 
                        <div>
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password"  placeholder="Confirm Password"  />
                        </div> 
                        <div>
                            <label />
                            <button className="primary" type="submit">
                                Update
                            </button>
                        </div>
                    </>
                )
            }
        </form>
    </div>
  )
}

export default ProfileScreen