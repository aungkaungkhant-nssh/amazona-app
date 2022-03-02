import React,{useEffect} from 'react'
import Product from '../components/Product';
import Loadingbox from '../components/LoadingBox';
import Messagebox from '../components/MessageBox';
import { useSelector,useDispatch  } from 'react-redux';
import { listProducts } from '../redux/product/productAction';
import { listTopSellers } from '../redux/user/userAction';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

function HomeScreen() {
  const productList = useSelector(state => state.productList) ;
  const {products,loading,error} =productList;
  const userTopSellerList = useSelector(state => state.userTopSellerList);
  const {users:sellers,loading:loadingSeller,error:errorSeller} = userTopSellerList;
  const dispatch = useDispatch();


  useEffect(()=>{
      dispatch(listProducts());
      dispatch(listTopSellers())
  },[])
  
  return (
    <div>
        <h2>Top Sellers</h2>
        {
          loadingSeller ? ( <Loadingbox /> )
          :errorSeller ? ( <Messagebox variant="danger">{errorSeller}</Messagebox> )
          :(
            <>
              {sellers.length==0 && <Messagebox variant="danger">Seller Not Found</Messagebox>}
              <Carousel showArrows autoPlay showThumbs={false}>
                  {
                    sellers.map((seller)=>(
                        <div key={seller._id}>
                            <Link to={`/seller/${seller._id}`}>
                                 <img src={seller.seller.logo} alt={seller.seller.name} />
                                 <p className="legend">{seller.seller.name}</p>
                            </Link>
                        </div>             
                    ))
                  }
              </Carousel>
            </>
          )
        }
        <h2>Featured Products</h2>
        {
          loading ? <Loadingbox />
          :error ? <Messagebox variant="danger">{error}</Messagebox>
          :(
            <>
              {products.length === 0  && <Messagebox variant="danger">Product not found</Messagebox>}
              <div className="row center">
                  {
                    products.map((product)=>(
                        <Product product={product} key={product._id}/>
                    ))
                  }
              </div>
            </>
          )
        }
        
    </div>
  )
}

export default HomeScreen