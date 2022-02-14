import React,{useState,useEffect} from 'react'
import Product from '../components/Product';
import data from '../data';
import axios from 'axios'
import Loadingbox from '../components/LoadingBox';
import Messagebox from '../components/MessageBox';
function HomeScreen() {
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false)
  useEffect(()=>{
    const fetchData = async ()=>{
        try{
          setLoading(true);
          const {data}= await axios.get('/api/products');
          setLoading(false);
          setProducts(data);
        }catch(error){
          setLoading(false);
          setError(error.message);
        }
       
    }
    fetchData();
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