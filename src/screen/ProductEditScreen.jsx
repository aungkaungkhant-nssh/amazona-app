import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { detailProduct, updateProduct } from '../redux/product/productAction';
import {useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios';


function ProductEditScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const productUpdate = useSelector((state) => state.productUpdate);
  const {product,error,loading} = productDetail;
  const {error:updatedError,loading:updatedLoading,success:updatedSuccess} = productUpdate;
  
  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [image,setImage] = useState("");
  const [category,setCategory] = useState("");;
  const [brand,setBrand] = useState("");
  const [numberInstock,setNumberInstock] = useState("");
  const [description,setDescription] = useState("");

  const navigate = useNavigate();

  const [uploadLoading,setUploadLoading] = useState(false);
  const [uploadError,setUploadError] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  useEffect(()=>{
      if(updatedSuccess) navigate("/productList");

      if(!product || product._id !== params.id){
        dispatch(detailProduct(params.id));
      }else{
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setCategory(product.category);
          setBrand(product.brand);
          setNumberInstock(product.numberInstock);
          setDescription(product.description)
      }
      
  },[params.id,dispatch,product,updatedSuccess]);

 const updateHandler = (e)=>{
    e.preventDefault();
    dispatch(updateProduct(params.id,{name,price,image,category,brand,numberInstock,description}));
 }
 const uploadHandler = async(e)=>{
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image",file);
    setUploadLoading(true);
    try{
      let {data} = await Axios.post('/api/uploads',formData,{
        headers:{
          Authorization:`Bearer ${userInfo.token}`
        }
      })
      setImage(data);
      setUploadLoading(false);
    }catch(err){
      setUploadLoading(false);
      setUploadError(err.message)
    }

 }
  return (
    <div>
      <form  className="form" onSubmit={updateHandler}>
        <div>
          <h1>Edit Product {product?._id}</h1>
         </div>
         { updatedLoading && <LoadingBox /> }
         { updatedError && <MessageBox variant="danger">{updatedError}</MessageBox> }

         {
            loading ? ( <LoadingBox /> )
            :error ? ( <MessageBox variant="danger">{error}</MessageBox> )
            :(
              <>
                <div>
                  <label htmlFor="name">Name</label>
                  <input type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="price">Price</label>
                  <input type="text" placeholder="Enter price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="image">Image</label>
                  <input type="file" onChange={e => uploadHandler(e)}/>
                </div>
                <div>
                  <label htmlFor="category">Category</label>
                  <input type="text" placeholder="Enter price" value={category} onChange={(e)=>setCategory(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="brand">Brand</label>
                  <input type="text" placeholder="Enter brand" value={brand} onChange={(e)=>setBrand(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="numberInstock">Number Instock</label>
                  <input type="text" placeholder="Enter brand" value={numberInstock} onChange={(e)=>setNumberInstock(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <textarea name="" id="" onChange={(e) => setDescription(e.target.value)} value={description}>
                    
                  </textarea>
                  
                </div>
                <div>
                   <label></label>
                  <button className="primary" type="submit">
                    Update
                  </button>
                </div>
              </>
            )
          }
       
      </form>
    </div>

  )
}

export default ProductEditScreen