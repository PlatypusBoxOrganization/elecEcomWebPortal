
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./features/auth/authComponent/Signup";

import Login from "./features/auth/authComponent/Login";
import NavBar from "./pages/NavBar";
import HomePage from "./pages/HomePage";
import ProductDetail from "./features/product/productComponent/ProductDetail";
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
      </header>
    </div>
  );
}

export default App;
