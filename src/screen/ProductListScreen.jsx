import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { createProduct, listProducts,deleteProduct } from '../redux/product/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useLocation, useNavigate } from 'react-router';
import Loadingbox from '../components/LoadingBox';
import Messagebox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../redux/product/productType';
import {useSearchParams,Link} from 'react-router-dom'

function ProductListScreen() {
  const [searchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get("pageNumber")) || 1;
  const dispatch = useDispatch();
  const location = useLocation();
  const sellerMode = location.pathname.indexOf("/seller")>=0;

  const productList = useSelector((state) => state.productList);
  const {products,error,loading,page,pages} = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const {error:deletedError,loading:deletedLoading,success:deletedSuccess} = productDelete;

  const userSignin = useSelector((state)=>state.userSignin);
  const {userInfo} = userSignin;

  const navigate = useNavigate();
  const productCreate = useSelector((state)=>state.productCreate);
  const {loading:createdLoading,error:createdError,success:createdSuccess,product:createdProduct} = productCreate;


  useEffect(()=>{
    if(createdSuccess) {
      dispatch({type:PRODUCT_CREATE_RESET});
      navigate(`/product/${createdProduct._id}/edit`);
    }
    if(deletedSuccess) dispatch({type:PRODUCT_DELETE_RESET});

    dispatch(listProducts(sellerMode ? userInfo.id : "",pageNumber));
  },[createdSuccess,createdProduct,deletedSuccess,sellerMode,pageNumber]);
  
  const deleteHandler =(product)=>{
      dispatch(deleteProduct(product))
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
        { createdLoading && <Loadingbox /> }
        { createdError && <Messagebox variant="danger">{createdError}</Messagebox> }

        { deletedLoading && <LoadingBox /> }
        { deletedError && <MessageBox variant="danger">{deletedError}</MessageBox>}
       

        {
          loading ? ( <LoadingBox></LoadingBox> )
          :error ? ( <MessageBox variant="danger">{error}</MessageBox> )
          :(
            <>
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
            <div className="row center pagination">
            {
              [...Array(pages).keys()].map((x)=>(
                <Link 
                  to={`/productList?pageNumber=${x+1}`}
                  className={x+1 === pageNumber ? "active" : ""}
                  >
                    {x+1}
                </Link>
              ))
            }
            </div>
           </>
          )
        }
    </div>
  )
}

export default ProductListScreen