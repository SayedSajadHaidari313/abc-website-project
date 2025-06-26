import { useAuthStore } from "@/auth/auth.store";
import React from "react";
import { Navigate, Outlet, Routes, Route, useLocation } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { UserProtectedRoutes } from "./ProtectedRoutes";

// Routes only for guests (unauthenticated users)
const GuestOnlyPaths = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

// Protected wrapper: Only logged-in users can access
export const RequireAuth = () => {
  const { isLoggedIn, token } = useAuthStore();
  if (!token && !isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

// Public wrapper: Everyone can access public routes
// But logged-in users should NOT access guest-only routes
export const PublicRoute = () => {
  const { user, token } = useAuthStore();
  const location = useLocation();
  console.log("data uer ", user);

  // If user is logged in and trying to access a guest-only route
  if (token && GuestOnlyPaths.includes(location.pathname)) {
    if (user?.role_id === 2) {
      return <Navigate to="/candidate/dashboard" replace />;
    }
  }

  // Otherwise allow access to the public route
  return <Outlet />;
};

function Router() {
  const { user } = useAuthStore();

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        {PublicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Protected Routes */}
      <Route element={<RequireAuth />}>
        {user?.role_id === 2 &&
          UserProtectedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
      </Route>
    </Routes>
  );
}

export default Router;
