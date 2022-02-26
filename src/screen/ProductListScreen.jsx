import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { createProduct, listProducts } from '../redux/product/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useNavigate } from 'react-router';
import Loadingbox from '../components/LoadingBox';
import Messagebox from '../components/MessageBox';

function ProductListScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {products,error,loading} = productList;
  const navigate = useNavigate();
  const productCreate = useSelector((state)=>state.productCreate);
  const {loading:createdLoading,error:createdError,success:createdSuccess,product:createdProduct} = productCreate;

  useEffect(()=>{
    
    dispatch(listProducts());
  },[createdSuccess,createdProduct]);
  
  const deleteHandler =()=>{
    ///Todo delete
  }
  const createHandler = ()=>{
    dispatch(createProduct());
  }
  return (
    <div>
        <div className="row">
            <h1>Products</h1>
            <button type="button" className="primary" onClick={createHandler}>
              Create Product
            </button>
        </div>
        {  createdLoading && <Loadingbox /> }
        { createdError && <Messagebox variant="danger">{createdError}</Messagebox> }
      
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
                              <button type="button" className="small" onClick={()=>navigate(`/product/${product._id}/edit`)}>
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