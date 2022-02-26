import React, { useEffect } from 'react';
import CheckOutStep from '../components/CheckOutStep';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { createOrder } from '../redux/order/orderAction';
import { useNavigate } from 'react-router';
import { ORDER_CREATE_RESET } from '../redux/order/orderType';
const PlaceOrderScreen =()=>{
    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading,error,success,order} = orderCreate;
    const toPrice = (price) => Number(price.toFixed(2));

    cart.itemsPrice = toPrice(cart.cartItems.reduce((a,c)=> a+ c.qty*c.price,0));
    cart.shippingPrice= toPrice(cart.cartItems.reduce((a,c)=> a+ c.qty*c.price,0))> 100 ? toPrice(0): toPrice(100);
    cart.taxPrice = toPrice(0.15*cart.itemsPrice);

    cart.totalPrice=toPrice(cart.itemsPrice + cart.shippingPrice + cart.taxPrice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const placeOrderHandler =(e)=>{
        dispatch(createOrder({...cart,orderItems:cart.cartItems}))
    }
    useEffect(()=>{
        if(success){
            navigate(`/order/${order._id}`);
            dispatch({type:ORDER_CREATE_RESET});
        }
    },[navigate,success,order,dispatch])
    return (
        <div>
            <CheckOutStep step1 step2 step3 step4/>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <ul>
                                    <li>
                                        <strong>Name : </strong>
                                        {cart.shippingAddress.fullName}
                                    </li>
                                    <li>
                                        <strong>Address : </strong>
                                        {cart.shippingAddress.address}
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
                                        {cart.paymentMethod}
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        cart.cartItems.map((c)=>(
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
                                    <div>$ {cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>$ {cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>$ {cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${cart.totalPrice}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button 
                                className='primary block'
                                disabled={cart.cartItems.length===0}
                                onClick={placeOrderHandler}
                                >Place Order</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PlaceOrderScreen;