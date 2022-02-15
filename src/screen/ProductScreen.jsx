import React, { useEffect, useState } from 'react'
import { Link,useParams,useNavigate } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux';
import { detailProduct } from '../redux/product/productAction';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

function ProductScreen() {
  let params = useParams();
  let navigate = useNavigate();
  let data =useSelector(state => state.productDetail)
  let {product,error,loading} =data;
  const dispatch = useDispatch();
  const [qty,setQty] = useState(1)
  useEffect(()=>{
    dispatch(detailProduct(params.id));
  },[])
  const handleClick = ()=>{
    navigate(`/cart/${params.id}?qty=${qty}`)
  }
 
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
         }
         
    </div>
   
  )
}

export default ProductScreen