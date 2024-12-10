
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./features/auth/authComponent/Signup";

import Login from "./features/auth/authComponent/Login";

import HomePage from "./pages/HomePage";
import ProductDetail from "./features/product/productComponent/ProductDetail";
import Footer from "./pages/Footer";
import Verification from "./features/auth/authComponent/Verification";
import ProductForm from "./features/admin/AdminComponent/ProductForm";
import Sidebar from "./features/admin/AdminComponent/Sidebar";
import Default from "./features/admin/AdminComponent/Default";
import AdminPanelLayout from "./features/admin/AdminComponent/AdminPanelLayout";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminPanelLayout />} />
            <Route path="/verify" element={<Verification />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/productDetail/:id" element={<ProductDetail />} />
            <Route path="/productForm" element={<ProductForm />} />
            
            <Route path="/admin" element={<AdminPanelLayout />}>
              <Route path="productForm" element={<ProductForm />} />
              <Route path="default" element={<Default />} />
              {/* Add more admin routes here */}
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </header>
    </div>
  );
}

export default App;
