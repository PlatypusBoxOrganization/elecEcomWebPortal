import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const user = useSelector(selectLoggedInUser);
  
  // Check if user is logged in and has admin role
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  
  // Check for admin role (you might need to adjust this based on your user object structure)
  if (user.role !== 'admin') {
    // If user is logged in but not admin, redirect to home
    return <Navigate to="/" replace={true} />;
  }
  
  return children;
}

export default ProtectedAdmin;
