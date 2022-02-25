import './App.css';
import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
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
function App() {
   const cart=useSelector((state) => state.cart);
   const {cartItems}=cart;
   const userSignin = useSelector((state) => state.userSignin);


   const {userInfo}= userSignin;
   const dispatch = useDispatch();
   const signoutHandler=()=>{
        dispatch(signout())
   }
   
  return (
    <BrowserRouter>
         <div className="grid-container">
        <header className="row">
            <div>
                <Link to="/" className="brand">amazona</Link>
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
                                        <Link to="/products">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/orders">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/users">Users</Link>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                
            </div>
        </header>
        <main>
            <Routes>
                <Route path="/cart/:id" element={<CartScreen />}/>
                <Route path="/cart/" element={<CartScreen />}/>
                <Route path="/" element={<HomeScreen />} exact/>
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/signin" element={< SigninScreen/>}></Route>
                <Route path="/signup" element={<SignUpScreen />}></Route>
                <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
                <Route path="/payment" element={<PaymentMethodScreen />}></Route>
                <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
                <Route path="/order/:id" element={<OrderScreen />}></Route>
                <Route path="/orderhistory" element={<PrivateRoute><OrderHistoryScreen /></PrivateRoute>}></Route>
                <Route path="/profile" element={<PrivateRoute><ProfileScreen /></PrivateRoute>}></Route>
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
