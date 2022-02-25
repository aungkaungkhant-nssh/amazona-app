import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { listProducts } from '../redux/product/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function ProductListScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {products,error,loading} = productList;
  useEffect(()=>{
    dispatch(listProducts());
  },[]);
  
  const deleteHandler =()=>{
    ///Todo delete
  }
  return (
    <div>
        <h1>Products</h1>
        {
          loading ? ( <LoadingBox></LoadingBox> )
          :error ? ( <MessageBox variant="danger">{error}</MessageBox> )
          :(
            <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((product)=>(
                      <tr key={product._id}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.category}</td>
                          <td>{product.brand}</td>
                          <td>
                              <button type="button" className="small">
                                Edit
                              </button>
                              <button type="button" className="small" onClick={()=>deleteHandler(product)}>
                                Delete
                              </button>
                          </td>
                      </tr>
                    ))
                  }
                </tbody>
            </table>
          )
        }
    </div>
  )
}

export default ProductListScreen