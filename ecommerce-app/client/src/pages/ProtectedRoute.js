import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Profile from "./Profile";

function ProtectedRoute() {
  const { loggedIn } = useAuth();
  
  return loggedIn ? <Profile /> : <Navigate to="/" />;
}

export default ProtectedRoute;
