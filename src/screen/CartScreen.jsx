import React from 'react';
import { useParams,useSearchParams } from 'react-router-dom'
const CartScreen = () => {
    let params= useParams();
    const [searchParams] = useSearchParams();
    const qty =searchParams.get("qty")

    return (
        <div>
            <h1>Cart Screen </h1>
            <p>Add to Cart : PRODUCT ID:{params.id} QTY:{qty}</p>
        </div>
    );
}

export default CartScreen;
