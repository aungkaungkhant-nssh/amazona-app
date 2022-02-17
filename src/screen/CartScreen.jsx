import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams,useSearchParams } from 'react-router-dom'
import { addToCart } from '../redux/cart/cartAction';
const CartScreen = () => {
    let params= useParams();
    const [searchParams] = useSearchParams();
    const qty =+searchParams.get("qty")
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(addToCart(params.id,qty))
    },[params.id,qty])
    return (
        <div>
            <h1>Cart Screen </h1>
            <p>Add to Cart : PRODUCT ID:{params.id} QTY:{qty}</p>
        </div>
    );
}

export default CartScreen;
