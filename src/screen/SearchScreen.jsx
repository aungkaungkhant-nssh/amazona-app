import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom'
import { listProducts } from '../redux/product/productAction';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox'
import Messagebox from '../components/MessageBox';
import Product from '../components/Product'
import { useNavigate } from 'react-router';
import {prices,ratings} from '../util';
import Rating from '../components/Rating';
function SearchScreen() {
  const [searchParams] = useSearchParams();
  let searchName = searchParams.get("name");
  let searchCategory = searchParams.get("category");
  let sortOrder = searchParams.get("order");
  let searchMin = searchParams.get("min");
  let searchMax = searchParams.get("max");
  let searchRating = searchParams.get("rating");
  const dispatch = useDispatch();
  const productList = useSelector((state)=>state.productList);
  const {products,loading,error} = productList;
  const productListCategories = useSelector((state)=>state.productListCategories);
  const {loading:loadingCategories,error:errorCategories,categories}= productListCategories;
  const navigate = useNavigate();
  useEffect(()=>{
    if(searchName=="" || searchName==null){
      searchName="all";
    }
    if(searchCategory=="" || searchCategory==null){
      searchCategory="all";
    }
    if(sortOrder===null){
      sortOrder="newest";
    }
  
    dispatch(listProducts(
      "",
       searchName==="all" ? "" : searchName,
       searchCategory==="all" ? "": searchCategory,
       sortOrder,
       searchMax=="all" ? "":searchMax,
       searchMin=="all" ? "" : searchMin,
       searchRating
    ));
    
  },[searchName,searchCategory,sortOrder,searchMin,searchMax,searchRating]);

  const getUrl = (filter)=>{
    let category = filter.category || searchCategory || "all";
    let name = filter.name || searchName;
    let order = filter.order || sortOrder;
    let min=  filter.min ? filter.min : filter.min==0 ? 0 : searchMin || 0;
    let max = filter.max ? filter.max : filter.max==0 ? 0 : searchMax || 100000;
    let rating = filter.rating || searchRating || 0;
    return `/search?name=${name}&category=${category}&order=${order}&min=${min}&max=${max}&rating=${rating}`
  }
  const handleOrderChange = (e)=>{
    if(searchCategory=="" || searchCategory==null){
      searchCategory="all";
    }
    navigate(getUrl({order:e.target.value}))
  }
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
          <div>
            Sort By {' '}
            <select name="" onChange={handleOrderChange} >
              <option value="newest">Newest Arrivals</option>
              <option value="lowest">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="toprated">Avg.Customer Reviews</option>
            </select>
          </div>
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <div>
            {
              loadingCategories ? (<LoadingBox />)
              : errorCategories ? (<Messagebox variant="danger">{errorCategories}</Messagebox>)
              :(
                <ul>
                  <li>
                    <Link
                    className={"all"===searchCategory ? "active":""} 
                    to={getUrl({category:"all"})}>Any</Link>
                  </li>
                  {
                    categories.map((cat)=>(
                      <li key={cat}>
                        <Link
                         className={cat===searchCategory ? "active":""} 
                         to={getUrl({category:cat})}>{cat}</Link>
                      </li>
                    ))
                  }
                </ul>
              )
            }
          </div>
          <div>
             <h3>Price</h3>
             {
               <ul>
                  {
                    prices.map((p)=>(
                      <li key={p.name} className={`${p.min}-${p.max}`===`${searchMin}-${searchMax}` ? "active":""}>
                        <Link to={getUrl({min:p.min,max:p.max})}>
                          {p.name}
                        </Link>
                      </li>
                    ))
                  }
               </ul>
             }
          </div>
          <div>
              <h3>Avg. Customer Review</h3>
              <ul>
                {
                  ratings.map((r)=>(
                    <li key={r.name}>
                      <Link to={getUrl({rating:r.rating})}>
                          <Rating rating={r.rating} caption={' & up'}/>
                      </Link>
                    </li>
                  ))
                }
              </ul>
          </div>
        </div>
        <div className="col-3">
        {
            loading ? (<LoadingBox />)
            : error ? (<Messagebox variant="danger">{error}</Messagebox>)
            :(
              <>
                <div className="row center">
                  {products.length ===0 && <Messagebox>Product Not found</Messagebox>}
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