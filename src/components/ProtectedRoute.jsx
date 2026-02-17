import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate=useNavigate()

  if(!isLoggedIn){
    navigate("/log-in");
  }

  return <>{children}</>; 
};

export default ProtectedRoute;
