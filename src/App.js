import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./features/auth/authComponent/Signup";
import Login from "./features/auth/authComponent/Login";
import Verify from "./features/auth/authComponent/Verify";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import PhonesPage from "./pages/PhonesPage";
import Cart from "./features/cart/Cart";
import Wishlist from "./features/wishlist/Wishlist";
import Profile from "./features/profile/Profile";
import Protected from "./features/auth/authComponent/Protected";
import Checkout from "./features/checkout/Checkout";
import OrderConfirmation from "./features/checkout/OrderConfirmation";
import SearchResults from "./features/search/SearchResults";
import Footer from "./pages/Footer";
import ProductForm from "./features/admin/AdminComponent/ProductForm";
import Sidebar from "./features/admin/AdminComponent/Sidebar";
import Default from "./features/admin/AdminComponent/Default";
import AdminPanelLayout from "./features/admin/AdminComponent/AdminPanelLayout";
import AdminDashboard from "./pages/AdminDashboard";
import { useTheme } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from './context/ThemeContext';
import { useSelector } from 'react-redux';
import { selectLoggedInUser, selectIsAdmin } from './features/auth/authSlice';

// Admin Route Protection
const ProtectedAdminRoute = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const isAdmin = useSelector(selectIsAdmin);
  
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppContent() {
  const { darkMode } = useTheme();

  return (
    <div className={`App min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className={`dark:bg-dark transition-colors duration-200`}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? 'dark' : 'light'}
        />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected User Routes */}
            <Route path="/cart" element={<Protected><Cart /></Protected>} />
            <Route path="/wishlist" element={<Protected><Wishlist /></Protected>} />
            <Route path="/profile" element={<Protected><Profile /></Protected>} />
            <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
            <Route path="/order-confirmation" element={<Protected><OrderConfirmation /></Protected>} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/productDetail/:id" element={<ProductDetail />} />
            <Route path="/productDetail/:id/:slug" element={<ProductDetail />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedAdminRoute>
                  <AdminPanelLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ProductForm />} />
              <Route path="orders" element={<Default />} />
              <Route path="users" element={<Default />} />
              <Route path="settings" element={<Default />} />
            </Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
