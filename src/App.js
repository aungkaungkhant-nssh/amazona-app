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
                <Link to="/signin">
                    {
                        userInfo ?
                        (
                            <div className="dropdown">
                                <Link to="#">
                                {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                                </Link>
                                <ul className="dropdown-content">
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
                </Link>
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
