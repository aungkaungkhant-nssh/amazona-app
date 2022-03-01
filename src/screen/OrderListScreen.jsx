import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrder } from '../redux/order/orderAction';

import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { useLocation, useNavigate } from 'react-router';

function OrderListScreen() {
  let location = useLocation();
  let sellerMode = location.pathname.indexOf("/seller")>=0;
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const {orders,error,loading} = orderList;
  

  const orderDelete = useSelector((state) => state.orderDelete);
  const {error:deletedError,loading:deletedLoading,success:deletedSuccess} = orderDelete;

  const userSignin = useSelector((state) =>state.userSignin);
  const {userInfo} = userSignin;

  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(listOrder(sellerMode ? userInfo.id :""));
  },[deletedSuccess]);
  
  const deleteHandler = (order)=>{
      if(window.confirm("Are you sure want to delete")){
         dispatch(deleteOrder(order))
      }
  }
  return (
    <div>
        <h1>Orders</h1>
        { deletedLoading && <LoadingBox /> }
        { deletedError && <MessageBox variant="danger">{deletedError}</MessageBox> }

        {
          loading ? (<LoadingBox />)
          : error ? ( <MessageBox variant="danger">{error}</MessageBox> )
          :(
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      orders.map((order)=>(
                         <tr key={order._id}>
                            <th>{order._id}</th>
                            <th>{order.user.name}</th>
                            <th>{order.createdAt.substring(0,10)}</th>
                            <th>{order.totalPrice.toFixed(2)}</th>
                            <th>{order.isPaid ? order.paidAt.substring(0,10) : "No"}</th>
                            <th>
                              {order.isDelivered ? order.deliveredAt.substring(0,10) :"No"}
                            </th>
                            <th>
                            <button
                                type="button"
                                className="small"
                                onClick={() => {
                                 navigate(`/order/${order._id}`);
                                }}
                              >
                                 Details
                              </button>
                              <button type="button" className="small" onClick={()=>deleteHandler(order)}>
                                Delete
                              </button>
                            </th>
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

export default OrderListScreen