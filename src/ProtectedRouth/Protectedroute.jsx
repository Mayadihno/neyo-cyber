import { Navigate, Outlet } from "react-router-dom";
import UseAuth from "./UseAuth";

const ProtectedRoute = () => {
  const { loading, loggedIn } = UseAuth();
  if (loading) {
    return "Loading";
  }
  return loggedIn ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;
