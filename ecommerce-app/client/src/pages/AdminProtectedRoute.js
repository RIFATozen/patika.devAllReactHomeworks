import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Admin from "./Admin";


function AdminProtectedRoute() {
  const { user } = useAuth();

  return user?.role==="admin" ? <Admin /> : <Navigate to="/" />;
}

export default AdminProtectedRoute;
