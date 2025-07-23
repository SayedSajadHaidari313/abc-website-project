import { lazy } from "react";

// Lazy load all components
const Home = lazy(() => import("@/pages"));
const EmployersSingleV1 = lazy(() =>
  import("@/pages/employers-single/employers-single-v1")
);
const CompanyListPage3 = lazy(() => import("@/pages/job-list/company-list-v3"));
const CompanySingleDynamicV1 = lazy(() =>
  import("@/pages/single-pages/company-single-v1")
);
const NotFoundPage = lazy(() => import("@/pages/not-found"));
const AboutPage = lazy(() => import("@/pages/others/about"));
const ContactPage = lazy(() => import("@/pages/others/contact"));
const FaqPage = lazy(() => import("@/pages/others/faq"));
const ForgotPasswordPage = lazy(() => import("@/pages/others/forgotpassword"));
const LoginPage = lazy(() => import("@/pages/others/login"));
const RegisterPage = lazy(() => import("@/pages/others/register"));
const ResetPasswordPage = lazy(() => import("@/pages/others/reset-password"));
const TermsPage = lazy(() => import("@/pages/others/terms"));
const GoogleCallback = lazy(() => import("@/components/auth/GoogleCallback"));
const RfpListPage1 = lazy(() =>
  import("@/pages/employers-list/employers-list-v1")
);
const RfpSingleDynamicV2 = lazy(() =>
  import("@/pages/single-pages/rfps-single-v2")
);

export const PublicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/listing", element: <CompanyListPage3 /> },
  { path: "/rfps", element: <RfpListPage1 /> },
  { path: "/company/:slug", element: <CompanySingleDynamicV1 /> },
  { path: "/rfps-details/:id", element: <RfpSingleDynamicV2 /> },
  { path: "/company-details/:id", element: <EmployersSingleV1 /> },

  {
    /* 404 */
  },
  { path: "404", element: <NotFoundPage /> },
  { path: "*", element: <NotFoundPage /> },

  { path: "about", element: <AboutPage /> },
  { path: "faq", element: <FaqPage /> },
  { path: "terms", element: <TermsPage /> },
  { path: "contact", element: <ContactPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "forgot-password", element: <ForgotPasswordPage /> },
  { path: "reset-password", element: <ResetPasswordPage /> },
  { path: "register", element: <RegisterPage /> },
  { path: "auth/google/callback", element: <GoogleCallback /> },
];
