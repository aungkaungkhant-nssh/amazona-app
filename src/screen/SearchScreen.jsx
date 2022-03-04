import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { listProducts } from '../redux/product/productAction';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox'
import Messagebox from '../components/MessageBox';
import Product from '../components/Product'
function SearchScreen() {
  const [searchParams] = useSearchParams();
  let searchName = searchParams.get("name");
  let searchCategory = searchParams.get("category");
  const dispatch = useDispatch();
  const productList = useSelector((state)=>state.productList);
  const {products,loading,error} = productList;
  
  useEffect(()=>{
    if(searchName=="" || searchName==null){
      searchName="all";
    }
    if(searchCategory=="" || searchCategory==null){
      searchCategory="all";
    }
    dispatch(listProducts("", searchName==="all" ? "" :searchName,searchCategory==="all"? " ":searchCategory));

  },[searchName,searchCategory]);

  return (
    <div>
      <div className="row">
          {
            loading ? (<LoadingBox />)
            : error ? (<Messagebox variant="danger">{error}</Messagebox>)
            :(
              <div>{products.length} Results</div>
            )
          }
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <ul>
            <li>Category 1</li>
          </ul>
        </div>
        <div className="col-3">
        {
            loading ? (<LoadingBox />)
            : error ? (<Messagebox variant="danger">{error}</Messagebox>)
            :(
              <>
                <div className="row center">
                  {
                    products.map((product)=>(
                        <Product key={product._id} product={product} />              
                    ))
                  }
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SearchScreen