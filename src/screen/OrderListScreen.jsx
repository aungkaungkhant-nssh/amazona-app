import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listOrder } from '../redux/order/orderAction';

import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function OrderListScreen() {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const {orders,error,loading} = orderList;

  useEffect(()=>{
    dispatch(listOrder());
  },[]);

  
 
  return (
    <div>
        <h1>Orders</h1>
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
                              <button type="button" className="small">
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