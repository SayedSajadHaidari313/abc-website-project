import { lazy } from "react";

// Lazy load all components
const DashboardPage = lazy(() =>
  import("@/pages/candidates-dashboard/dashboard")
);
const MyProfilePage = lazy(() =>
  import("@/pages/candidates-dashboard/my-profile")
);
const Logout = lazy(() => import("@/components/common/logout/Logout"));
const RfpPostPage = lazy(() =>
  import("@/pages/candidates-dashboard/rfp-posts")
);
const DeleteAccount = lazy(() =>
  import("@/components/dashboard-pages/candidates-dashboard/DeleteAccount")
);

// User Protected Routes
export const UserProtectedRoutes = [
  { path: "candidate/dashboard", element: <DashboardPage /> },
  { path: "candidate/post-new-rfps", element: <RfpPostPage /> },
  { path: "candidate/my-profile", element: <MyProfilePage /> },
  { path: "candidate/delete-account", element: <DeleteAccount /> },
  { path: "candidate/logout", element: <Logout /> },
];

export const ProtectedRoutes = [...UserProtectedRoutes];
