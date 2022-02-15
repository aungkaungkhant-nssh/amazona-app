import React,{useEffect} from 'react'
import Product from '../components/Product';
import Loadingbox from '../components/LoadingBox';
import Messagebox from '../components/MessageBox';
import { useSelector,useDispatch  } from 'react-redux';
import { listProducts } from '../redux/product/productAction';
function HomeScreen() {
  

  const productList = useSelector(state => state.productList) ;
  const {products,loading,error} =productList;
  const dispatch = useDispatch();
  console.log(productList)
  useEffect(()=>{
      dispatch(listProducts())
  
  },[])
  
  return (
    <div className="row center">
        {
          loading ? <Loadingbox />
          :error ? <Messagebox variant="danger">{error}</Messagebox>
          :products.map((product)=>(
            <Product product={product} key={product._id}/>
        ))
        }
        
    </div>
  )
}

export default HomeScreen