import React, { useEffect, useState } from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux';
import { createReview, detailProduct } from '../redux/product/productAction';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { addToCart } from '../redux/cart/cartAction';
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/product/productType';

function ProductScreen() {
  let params = useParams();
  let navigate = useNavigate();
  const productDetail = useSelector((state) => state.productDetail);
  const {product,error,loading} = productDetail;


  const dispatch = useDispatch();
  const [qty,setQty] = useState(1);

  const userSignin= useSelector((state)=>state.userSignin);
  const {userInfo} = userSignin;
  const productCreateReview = useSelector((state)=>state.productCreateReview);
  const {loading:loadingReviewCreate,error:errorReviewCreate,success:successReviewCreate}= productCreateReview;

  const [rating,setRating] = useState(0);
  const [comment,setComment] = useState("");
  useEffect(()=>{
      if(successReviewCreate){
        alert('Review Submitted Successfully');
        setRating("");
        setComment("");
        dispatch({type:PRODUCT_CREATE_REVIEW_RESET});
      }
      dispatch(detailProduct(params.id));
  
  },[params.id,dispatch,successReviewCreate]);

  const handleClick = ()=>{
    dispatch(addToCart(params.id,qty))
    navigate(`/cart`)
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!rating && !comment)return alert("Please enter comment and rating");
    dispatch(createReview(params.id,{rating,comment}))
  }
  return (
    <div>
         {
           loading ? (<LoadingBox />)
           :error ? (<MessageBox variant="danger">{error}</MessageBox>)
           : ( <div className="row top">
             <Link to="/">back to result</Link>
              <div className="col-2">
                <img src={product.image} alt={product?.name} className="large"/>
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
                                    <div>Seller {' '}</div>
                                    <h2>
                                      <Link to={`/seller/${product?.seller?._id}`}>
                                        {product?.seller?.seller?.name}
                                      </Link>
                                    </h2>
                            </div>
                          </li>
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
                            
                              {
                                product.numberInstock >0 && (
                                  <>
                                    <li>
                                      <div className="row">
                                          <div>QTY</div>
                                          <div>
                                              <select value={qty} onChange={e => setQty(e.target.value)}>
                                                {
                                                  
                                                  [...Array(product.numberInstock).keys()].map((i)=>(
                                                    <option key={i} value={i+1}>{i+1}</option>
                                                  )) //[0,1,2,3,4].map()
                                                }
                                              </select>
                                          </div>
                                      </div>
                                    
                                    </li>
                                    <button className="primary block" style={{marginTop:"2.5rem"}} onClick={handleClick}>Add to Cart</button>
                                   </>
                                )
                              }
                            
                        </ul>
                    </div>
                </div>
              </div>
             
            )
         }
          <div>
                  <h2>Reviews</h2>
                  {product?.reviews.length === 0 && <MessageBox>There is no review</MessageBox>}
                  <ul>
                          {
                            product?.reviews.map((review)=>(
                              <li key={review._id}>
                                  <strong>{review.name}</strong>
                                  <Rating rating={review.rating} caption=" "></Rating>
                                  <p>{review.createdAt.substring(0,10)}</p>
                                  <p>{review.comment}</p>
                              </li>
                            ))
                          }
                      <li>
                          {
                            userInfo ? (
                              <form className="form" onSubmit={handleSubmit}>
                                    <div>
                                        <h2>Write Customer Review</h2>
                                    </div>
                                    <div>
                                      <label htmlFor="">Rating</label>
                                      <select value={rating} onChange={(e)=>setRating(e.target.value)}>
                                          <option value="">Select...</option>
                                          <option value="1">1- Poor</option>
                                          <option value="2">2- Fair</option>
                                          <option value="3">3- Good</option>
                                          <option value="4">4- Very good</option>
                                          <option value="5">5- Excelent</option>
                                      </select>
                                    </div>
                                    <div>
                                       <label htmlFor="comment">Comment</label>
                                       <textarea value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor=""></label>
                                        <button className="primary" type="submit">
                                          Submit
                                        </button>
                                    </div>
                                    <div>
                                        {loadingReviewCreate && <LoadingBox />}
                                        {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
                                    </div>
                              </form>
                            ):(
                              <MessageBox>Please <Link to="/signin">Signin</Link> to write a review</MessageBox>
                            )
                          }
                      </li>
                  </ul>
          </div>
    </div>
   
  )
}

export default ProductScreen