import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import CheckOutStep from '../components/CheckOutStep'
import { saveShippingAddress } from '../redux/cart/cartAction';


function ShippingAddressScreen() {
 const navigate = useNavigate();
 const cart = useSelector(state => state.cart);
 const {shippingAddress} = cart;
 const userSignIn = useSelector(state => state.userSignin);
 const {userInfo} = userSignIn;

 const [fullName,setFullName] = useState(shippingAddress.fullName);
 const [address,setAddress] = useState(shippingAddress.address);
 const [city,setCity] = useState(shippingAddress.city);
 const [postalCode,setPostalCode] = useState(shippingAddress.postalCode);
 const [country,setCountry] = useState(shippingAddress.country);
 const dispatch = useDispatch();


 const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(saveShippingAddress({fullName,address,city,postalCode,country}))
    navigate("/payment")
 }
 useEffect(()=>{
    if(!userInfo){
        navigate("/signin")
    }
 },[userInfo,navigate])
  return (
    <div>
        <CheckOutStep step1 step2/>
        <form action="" className="form" onSubmit={submitHandler}>
            <div>
                <h1>Shipping Address</h1>
            </div>
            <div>
                <label htmlFor="fullname">Full Name</label>
                <input type="text" placeholder="Enter full name" id="fullName" 
                value={fullName} onChange={(e)=>setFullName(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input type="text" placeholder="Enter address" id="address" 
                value={address} onChange={(e)=>setAddress(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input type="text" placeholder="Enter city" id="city" 
                value={city} onChange={(e)=>setCity(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" placeholder="Enter postalCode" id="postalCode" 
                value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input type="text" placeholder="Enter Country" id="country" 
                value={country} onChange={(e)=>setCountry(e.target.value)} required/>
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

export default ShippingAddressScreen