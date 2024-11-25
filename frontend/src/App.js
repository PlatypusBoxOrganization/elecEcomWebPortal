
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./features/auth/authComponent/Signup";

import Login from "./features/auth/authComponent/Login";
import NavBar from "./pages/NavBar";
import HomePage from "./pages/HomePage";
import ProductDetail from "./features/product/productComponent/ProductDetail";
import Footer from "./pages/Footer";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path = "/" element={<HomePage/>} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>} />
           
             <Route path="/productDetail/:id" element={<ProductDetail/>}/>
           
          </Routes>
        
        </BrowserRouter>
        <Footer/>
      </header>
    </div>
  );
}

export default App;
