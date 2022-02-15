import './App.css';
import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
function App() {
  return (
    <BrowserRouter>
         <div className="grid-container">
        <header className="row">
            <div>
                <Link to="/" className="brand">amazona</Link>
            </div>
            <div>
                <a href="">cart</a>
                <a href="">sing in</a>
            </div>
        </header>
        <main>
            <Routes>
                <Route path="/cart/:id" element={<CartScreen />}/>
                <Route path="/" element={<HomeScreen />} exact/>
                <Route path="/product/:id" element={<ProductScreen />} />
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
