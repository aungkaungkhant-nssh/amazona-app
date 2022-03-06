import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter,Routes,Route,Link, useSearchParams } from "react-router-dom";
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screen/SignInScreen';
import { signout } from './redux/user/userAction';
import SignUpScreen from './screen/SignUpScreen';
import ShippingAddressScreen from './screen/ShippingAddressScreen';
import PaymentMethodScreen from './screen/PaymentMethodScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import OrderHistoryScreen from './screen/OrderHistoryScreen';
import ProfileScreen from './screen/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screen/ProductListScreen';
import ProductEditScreen from './screen/ProductEditScreen';
import OrderListScreen from './screen/OrderListScreen';
import UserListScreen from './screen/UserListScreen';
import UserEditScreen from './screen/UserEditScreen';
import SellerRoute from './components/SellerRoute'
import SellerScreen from './screen/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screen/SearchScreen';
import { useState } from 'react';
import { listProductCategories } from './redux/product/productAction';
import Loadingbox from './components/LoadingBox';
import Messagebox from './components/MessageBox';
import MapScreen from './screen/MapScreen';


function App() {
    
   const [name,setName] = useState("");
   const cart=useSelector((state) => state.cart);
   const {cartItems}=cart;
   const userSignin = useSelector((state) => state.userSignin);
   const [sidebarIsOpen,setsidebarIsOpen] = useState(false)

   const {userInfo}= userSignin;
   const dispatch = useDispatch();

   const productListCategories= useSelector((state)=>state.productListCategories);
   const {categories,loading,error} = productListCategories;
  
   const signoutHandler=()=>{
        dispatch(signout());
   }

   const getQueryname = (n)=>{
       setName(n);
   }
   useEffect(() => {
       dispatch(listProductCategories());
   }, []);
   

  return (
    <BrowserRouter>
         <div className="grid-container">
        <header className="row">
            <div>
                <button type="button" className="open-sidebar"
                onClick={()=>setsidebarIsOpen(true)}>
                    <i className="fa fa-bars"></i>
                </button>
                <Link to="/" className="brand">amazona</Link>
            </div>
            <div>
                <SearchBox getQueryname={getQueryname}/>
            </div>
            <div>
                <Link to="/cart">
                    Cart{
                        cartItems.length>0 &&
                        (
                            <span className="badge">{cartItems.length}</span>
                        )
                    }
                </Link>
                    {
                        userInfo ?
                        (
                            <div className="dropdown">
                                <Link to="#">
                                {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/profile">Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderhistory">Order History</Link>
                                    </li>
                                    <li>
                                        <Link to="#signout" onClick={signoutHandler}>
                                        Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )
                        :(
                            <Link to="/signin">Sign In</Link>
                        )
                    }
                      {
                        userInfo && userInfo.isSeller && (
                            <div className="dropdown">
                                  <Link to="#admin">
                                         Seller <i className="fa fa-caret-down"></i>
                                 </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/productlist/seller">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist/seller">Orders</Link>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                    {
                        userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                  <Link to="#admin">
                                         Admin <i className="fa fa-caret-down"></i>
                                 </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/productlist">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/userlist">Users</Link>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                
            </div>
        </header>
        <aside className={sidebarIsOpen ? "open" :""}>
            <ul className="categories">
                <li>
                    <strong>Categories</strong>
                    <button  className="close-sidebar" onClick={()=>setsidebarIsOpen(false)}>
                        <i className="fa fa-close"></i>
                    </button>
                </li>   
                {
                    loading ? (<Loadingbox />)
                    :error ? ( <Messagebox variant="danger">{error}</Messagebox> )
                    :(
                        categories.map((cat)=>(
                            <li key={cat}>
                                <Link to={`/search?name=${name}&category=${cat}`} onClick={()=>setsidebarIsOpen(false)}>{cat}</Link>
                            </li>
                        ))
                    )
                }    
            </ul>
        </aside>
        <main>
            <Routes>
                <Route path="/search" element={<SearchScreen />} exact></Route>
                <Route path="/cart/:id" element={<CartScreen />}/>
                <Route path ="/seller/:id" element={<SellerScreen />} />
                <Route path="/product/:id/edit" element={<ProductEditScreen />} />
                <Route path="/cart/" element={<CartScreen />}/>

                <Route path="/" element={<HomeScreen />} exact/>
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/signin" element={< SigninScreen/>}></Route>
                <Route path="/signup" element={<SignUpScreen />}></Route>
                <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
                <Route path="/payment" element={<PaymentMethodScreen />}></Route>
                <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>

          
                <Route path="/order/:id" element={<PrivateRoute><OrderScreen /></PrivateRoute>}></Route>

                
                <Route path="/orderhistory" element={<PrivateRoute><OrderHistoryScreen /></PrivateRoute>}></Route>

                <Route path="/profile" element={<PrivateRoute><ProfileScreen /></PrivateRoute>}></Route>

                <Route path="/productlist" element={<AdminRoute><ProductListScreen /></AdminRoute>}></Route>

                <Route path="/orderlist" element={<AdminRoute><OrderListScreen /></AdminRoute>}></Route>

                <Route path="/userlist" element={<AdminRoute><UserListScreen /></AdminRoute>}></Route>
                
               <Route path="user/:id/edit" element={<AdminRoute><UserEditScreen /></AdminRoute>}></Route>

               <Route path="/productlist/seller" element={<SellerRoute><ProductListScreen /></SellerRoute>}></Route>
                
               <Route path="/orderlist/seller" element={<SellerRoute><OrderListScreen /></SellerRoute>}></Route>

                <Route path="/map" element={<PrivateRoute><MapScreen /></PrivateRoute>}></Route>
            </Routes>
        </main>
        <footer className="row center">
            All right reserved
        </footer>
        </div>
    </BrowserRouter>
   
  );
}

export default App;
