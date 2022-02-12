
import './App.css';
import data from './data';
//change
function App() {
  return (
    <div className="grid-container">
    <header className="row">
        <div>
            <a className="brand" href="">amazona</a>
        </div>
        <div>
            <a href="">cart</a>
            <a href="">sing in</a>
        </div>
    </header>
    <main>
        <div className="row center">
            {
                data.products.map((product)=>(
                    <div className="card" key={product._id}>
                    <a href="">
                        <img className="medium" src={product.image} alt={product.name} />
                    </a>
                    <div className="card-body">
                        <a href="">
                            <h2>{product.name}</h2>
                        </a>
                        <div className="rating">
                            <span> <i className="fa-solid fa-star"></i></span>
                            <span> <i className="fa-solid fa-star"></i></span>  
                            <span> <i className="fa-solid fa-star"></i></span>
                            <span> <i className="fa-solid fa-star"></i></span>
                            <span> <i className="fa-solid fa-star"></i></span>
                        </div>
                        <div className="price">
                            {product.price}$
                            
                        </div>
                    </div>
                    </div>
                ))
            }
           
        </div>
    </main>
    <footer className="row center">
        All right reserved
    </footer>
    </div>
  );
}

export default App;
