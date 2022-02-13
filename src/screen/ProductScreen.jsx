import React from 'react'
import { Link,useParams } from 'react-router-dom'
import data from '../data'
import Rating from '../components/Rating'
function ProductScreen() {
  let params = useParams();
  const product = data.products.find((d) => d._id ===+params.id);
  
  return (
    <div>
         <Link to="/">back to result</Link>
         <div className="row top">
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
                                          <span className="error">Unavailable</span>
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
    </div>
   
  )
}

export default ProductScreen