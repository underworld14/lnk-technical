import { useAuthData } from "@/context/auth.context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { user } = useAuthData();

  return user ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
