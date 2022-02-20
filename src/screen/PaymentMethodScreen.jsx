import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import CheckOutStep from '../components/CheckOutStep'
import { savePaymentMethod } from '../redux/cart/cartAction';
function PaymentMethodScreen() {
  const [paymentMethod,setpaymentMethod] = useState("Paypal");
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart;



  const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder")
  }
  const navigate = useNavigate();
  useEffect(()=>{
      if(Object.keys(shippingAddress).length===0){
        navigate("/shipping")
      }
  })
  return (
    <div>
        <CheckOutStep step1 step2 step3/>
        <form action="" className="form" onSubmit={submitHandler}>
            <div>
                <h1>Payment Methods</h1>
            </div>
            <div>
                <div>
                    <input type="radio" value="Paypal" name="paymentMethod"  id="paypal" required checked onChange={(e)=>setpaymentMethod(e.target.value)}/>
                    <label htmlFor="paypal">PayPal</label>
                </div>
            </div>
            <div>
                <div>
                    <input type="radio" name="paymentMethod" id="stripe" value="Stripe" required onChange={(e)=>setpaymentMethod(e.target.value)} />
                    <label htmlFor="paypal">Stripe</label>
                </div>
            </div>
            <div>
                <label htmlFor=""></label>
                <button className="block primary" type="submit">
                    Continue
                </button>
            </div>
        </form>
    </div>
  )
}

export default PaymentMethodScreen