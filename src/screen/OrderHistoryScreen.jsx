import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import { historyOrder } from '../redux/order/orderAction';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useNavigate } from 'react-router';

function OrderHistoryScreen() {
  const dispatch = useDispatch();
  const {loading,orders,error} = useSelector(state => state.orderHistory);
  const navigate = useNavigate()
  useEffect(()=>{
     dispatch(historyOrder());
  },[])
  
  return (
    <div>
      <h1>Order History</h1>
      {
        loading ? (<LoadingBox />)
        :error ?  (<MessageBox variant="danger">{error}</MessageBox>)
        :(
          <table className="table">
              <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                  </tr>
              </thead>
              <tbody>
                {
                  orders.map((order )=>(
                    <tr key={order._id}>
                      <td>
                          {order._id}
                      </td>
                      <td>{order.createdAt.substring(0,10)}</td>
                      <td>$ {order.totalPrice.toFixed(2)}</td>
                      <td>{order.isPaid ? order.paidAt.substring(0,10) : "No"}</td>
                      <td>{order.isDelivered ? order.deliveredAt.substring(0, 10)
                        : 'No'}</td>
                      <td>
                        <button type="button" onClick={() => navigate(`/order/${order._id}`)} className="small">
                          Details
                        </button>
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

export default OrderHistoryScreen