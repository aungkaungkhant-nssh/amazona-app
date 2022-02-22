import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useParams} from 'react-router';
import { Link } from 'react-router-dom';
import Loadingbox from '../components/LoadingBox';
import Messagebox from '../components/MessageBox';
import { detailsOrder,payOrder } from '../redux/order/orderAction';

function OrderScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const orderDetail = useSelector(state => state.orderDetail);
  const orderPay = useSelector(state => state.orderPay);
  const {loading,order,error} = orderDetail;
  

  useEffect(()=>{
        dispatch(detailsOrder(params.id));
  },[params.id,dispatch,orderPay.success]);
  
  const successPaymentHandler=()=>{
    dispatch(payOrder({_id:order._id,status:true}))
  }
  return (
      <div>
          {
              loading ? <Loadingbox />
              :error ? <Messagebox variant="danger">{error}</Messagebox>
              :(
                <div>
                    <h1>Order : {params.id}</h1>
                    <div className="row top">
                            <div className="col-2">
                                <ul>
                                    <li>
                                        <div className="card card-body">
                                            <h2>Shipping</h2>
                                            <ul>
                                                <li>
                                                    <strong>Name : </strong>
                                                    {order.shippingAddress.fullName}
                                                </li>
                                                <li>
                                                    <strong>Address : </strong>
                                                    {order.shippingAddress.address}
                                                </li>
                                                <li>
                                                    {
                                                        order.isDelivered ? (
                                                            <Messagebox variant="success">
                                                                 Delivered at {order.deliveredAt}
                                                            </Messagebox>
                                                        ):(
                                                            <Messagebox variant="danger">Not delivered</Messagebox>
                                                        )
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="card card-body">
                                            <h2>Payment</h2>
                                            <ul>
                                                <li>
                                                    <strong>Method : </strong>
                                                    {order.paymentMethod}
                                                </li>
                                                <li>
                                                    {
                                                        order.isPaid ? (
                                                            <Messagebox variant="success">
                                                                 Paid at {order.paidAt}
                                                            </Messagebox>
                                                        ):(
                                                            <Messagebox variant="danger">Not Paid</Messagebox>
                                                        )
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="card card-body">
                                            <h2>Order Items</h2>
                                            <ul>
                                                {
                                                    order.orderItems.map((c)=>(
                                                        <li key={c.product}>
                                                            <div className="row">
                                                                <div>
                                                                    <img src={c.image} alt={c.name} className="small"/>
                                                                </div>
                                                                <div>
                                                                    <Link to={`/product/${c.product}`}>
                                                                        {c.name}
                                                                    </Link>
                                                                </div>
                                                                <div>
                                                                    {c.qty} x {c.price} = ${c.qty*c.price}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-1">
                                <div className="card card-body">
                                    <ul>
                                        <li>
                                            <h2>Order Summary</h2>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Item</div>
                                                <div>$ {order.itemsPrice.toFixed(2)}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Shipping</div>
                                                <div>$ {order.shippingPrice.toFixed(2)}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Tax</div>
                                                <div>$ {order.taxPrice.toFixed(2)}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div><strong>Order Total</strong></div>
                                                <div><strong>${order.totalPrice}</strong></div>
                                            </div>
                                        </li>
                                        <li>
                                            {
                                                !order.isPaid && (
                                                    <button className="block primary" onClick={()=>successPaymentHandler()}>Paypal</button>
                                                )
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                </div>
              )
          }
      </div>
    
   
  )
}

export default OrderScreen