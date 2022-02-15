import React, { useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux';
import { detailProduct } from '../redux/product/productAction';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
function ProductScreen() {
  let params = useParams();
  let data =useSelector(state => state.productDetail)
  let {product,error,loading} =data;
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(detailProduct(params.id));
  },[])
  return (
    <div>
         
         {
           loading ? <LoadingBox />
           :error ? <MessageBox variant="danger">{error}</MessageBox>
           :<div className="row top">
             <Link to="/">back to result</Link>
              <div className="col-2">
                <img src={product.image} alt={product.name} className="large"/>
              </div>
              <div className="col-1">
                  <div>
                      <ul>
                          <li><h1>{product.name}</h1></li>
                          <li>
                              <Rating rating={product.rating} numReviews={product.numReviews}/>
                          </li>
                          <li>Price : ${product.price}</li>
                          <li>Description : {product.description}</li>
                      </ul>
                  </div>
              </div>
              <div className="col-1">
                  <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">{product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>
                                        {
                                          product.numberInstock > 0?
                                          (
                                            <span className="success">In stock</span>
                                          ):
                                          (
                                            <span className="danger">Unavailable</span>
                                          )
                                        }
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block">Add to Cart</button>
                            </li>
                        </ul>
                  </div>
              </div>
            </div>
         }
         
    </div>
   
  )
}

export default ProductScreen