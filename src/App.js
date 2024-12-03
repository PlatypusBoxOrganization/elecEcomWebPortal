
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./features/auth/authComponent/Signup";

import Login from "./features/auth/authComponent/Login";

import HomePage from "./pages/HomePage";
import ProductDetail from "./features/product/productComponent/ProductDetail";
import Footer from "./pages/Footer";
import Verification from "./features/auth/authComponent/Verification";
import ProductForm from "./features/admin/AdminComponent/ProductForm";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<Verification />} />
            <Route path="/login" element={<Login />} />

            <Route path="/productDetail/:id" element={<ProductDetail />} />
            <Route path="/productForm" element={<ProductForm />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </header>
    </div>
  );
}

export default App;
