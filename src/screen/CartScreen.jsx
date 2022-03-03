import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useParams,useSearchParams,useNavigate } from 'react-router-dom'
import Messagebox from '../components/MessageBox';
import { addToCart, removeToCart } from '../redux/cart/cartAction';
const CartScreen = () => {
    let params= useParams();
    const [searchParams] = useSearchParams();
    const cart = useSelector(state => state.cart);
    const {cartItems,error} =cart;
    const qty =+searchParams.get("qty")
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const checkoutHandler=()=>{
        navigate(`/signin?redirect=shipping`)
    }
    const removeCartItem=(id)=>{
        dispatch(removeToCart(id))
    }
    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping cart</h1>
                {error && <Messagebox variant="danger">{error}</Messagebox>}
                {
                    cartItems.length===0 
                    ?(<Messagebox variant="danger">
                        Cart is Empty.<Link to="/">shopping</Link>
                    </Messagebox>
                    )
                    :(
                        <ul>
                            {
                                cartItems.map((i)=>(
                                    <li key={i.product}>
                                        <div className="row">
                                            <div>
                                                <img src={i.image} alt={i.name} className="small" />
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${i.product}`}>{i.name}</Link>
                                            </div>
                                            <div>
                                                <select value={i.qty} onChange={
                                                    (e)=>dispatch(addToCart(i.product,+e.target.value))
                                                }>
                                                    {
                                                        [...Array(i.numberInstock).keys()].map((x)=>(
                                                            <option value={x+1} key={x}>
                                                                {x+1}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div>$ {i.price}</div>
                                            <div>
                                                <button type="button" onClick={()=>removeCartItem(i.product)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                SubTotal ({cartItems.reduce((a,c)=>(a+c.qty),0)}{' '}items): ${cartItems.reduce((a,c)=>(a+(c.price*c.qty)),0)}
                            </h2>
                        </li>
                        <li>
                            <button className="primary block" onClick={checkoutHandler} disabled={cartItems.length===0}>Proceed To Checkout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CartScreen;
