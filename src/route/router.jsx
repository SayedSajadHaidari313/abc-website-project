import { useAuthStore } from "@/auth/auth.store";
import React, { Suspense } from "react";
import { Navigate, Outlet, Routes, Route, useLocation } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { UserProtectedRoutes } from "./ProtectedRoutes";

// Loading component for route transitions
const RouteLoadingSpinner = () => (
  <div className="route-loading-spinner">
    <div className="route-loading-spinner__spinner" />
  </div>
);

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
  return (
    <Suspense fallback={<RouteLoadingSpinner />}>
      <Outlet />
    </Suspense>
  );
};

// Public wrapper: Everyone can access public routes
// But logged-in users should NOT access guest-only routes
export const PublicRoute = () => {
  const { user, token } = useAuthStore();
  const location = useLocation();

  // If user is logged in and trying to access a guest-only route
  if (token && GuestOnlyPaths.includes(location.pathname)) {
    if (user?.role_id === 3) {
      return <Navigate to="/candidate/dashboard" replace />;
    }
  }

  // Otherwise allow access to the public route
  return (
    <Suspense fallback={<RouteLoadingSpinner />}>
      <Outlet />
    </Suspense>
  );
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
        {user?.role_id === 3 &&
          UserProtectedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
      </Route>
    </Routes>
  );
}

export default Router;
