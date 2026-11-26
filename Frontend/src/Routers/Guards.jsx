import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectIsLoggedIn } from "../features/auth/authSlice";

export const RequireAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicOnly = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { pathname } = useLocation();
  if (!isLoggedIn) return <Outlet />;
  return <Navigate to={pathname === "/signup" ? "/profile" : "/"} replace />;
};
