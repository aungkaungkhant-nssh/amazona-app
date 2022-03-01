import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router';
import Rating from '../components/Rating'
import { detailUser } from '../redux/user/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../redux/product/productAction';
import Product from '../components/Product'
function SellerScreen() {
  let params = useParams();
  let dispatch = useDispatch();
  let userDetails = useSelector((state)=>state.userDetails); 
  const {loading,error,user} = userDetails;
  let productList = useSelector((state)=>state.productList);
  let {loading:loadingProduct,error:loadingError,products} = productList;

  useEffect(()=>{
    dispatch(detailUser(params.id));
    dispatch(listProducts(params.id))
  },[params.id]);
 
  return (
    <div className="row top">
        <div className="col-1">
            {
                loading ? ( <LoadingBox></LoadingBox> )
                : error ? ( <MessageBox variant="danger">{error}</MessageBox> )
                :(
                    <ul className="cart card-body">
                        <li>
                            <div className="row start">
                                <div className="p-1">
                                    <img
                                        className="small"
                                        src={user.seller.logo}
                                        alt={user.seller.name}
                                    ></img>
                                </div>
                                <div className="p-1">
                                        <h1>{user.seller.name}</h1>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Rating
                                rating={user.seller.rating}
                                numReviews={user.seller.numReviews}
                            ></Rating>
                        </li>
                        <li>
                                <a href={`mailto:${user.email}`}>Contact Seller</a>
                        </li>
                        <li>{user.seller.description}</li>
                </ul>
                )
            }
        </div>
        <div className="col-3">
            {
                loadingProduct ? (<LoadingBox></LoadingBox>)
                :loadingError ? ( <MessageBox variant="danger">{loadingError}</MessageBox> )
                :(
                   <>
                   {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                    <div className="row center">
                        {products.map((product) => (
                            <Product key={product._id} product={product}></Product>
                        ))}
                    </div>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default SellerScreen