import Home from "@/pages";
import BlogDetailsDynamic from "@/pages/blog/blog-details";
import BlogListpage1 from "@/pages/blog/blog-list-v1";
import BlogListpage2 from "@/pages/blog/blog-list-v2";
import BlogListpage3 from "@/pages/blog/blog-list-v3";
import CandidateListPage1 from "@/pages/candidates-list/candidates-list-v1";
import CandidateListPage2 from "@/pages/candidates-list/candidates-list-v2";
import CandidateListPage3 from "@/pages/candidates-list/candidates-list-v3";
import CandidateListPage4 from "@/pages/candidates-list/candidates-list-v4";
import CandidateListPage5 from "@/pages/candidates-list/candidates-list-v5";
import CandidateSingleDynamicV1 from "@/pages/candidates-single/candidates-single-v1";
import CandidateSingleDynamicV2 from "@/pages/candidates-single/candidates-single-v2";
import CandidateSingleDynamicV3 from "@/pages/candidates-single/candidates-single-v3";
import EmployerListPage1 from "@/pages/employers-list/employers-list-v1";
import EmployerListPage2 from "@/pages/employers-list/employers-list-v2";
import EmployerListPage3 from "@/pages/employers-list/employers-list-v3";
import EmployerListPage4 from "@/pages/employers-list/employers-list-v4";
import EmployersSingleV1 from "@/pages/employers-single/employers-single-v1";
import EmployersSingleV2 from "@/pages/employers-single/employers-single-v2";
import EmployersSingleV3 from "@/pages/employers-single/employers-single-v3";
// import InsightListPage from "@/pages/insight-list";
// import JobListPage1 from "@/pages/job-list/job-list-v1";
import JobListPage3 from "@/pages/job-list/job-list-v3";
import CompanySingleDynamicV1 from "@/pages/job-single/company-single-v1";
import NotFoundPage from "@/pages/not-found";
import AboutPage from "@/pages/others/about";
import ContactPage from "@/pages/others/contact";
import FaqPage from "@/pages/others/faq";
import ForEmployer from "@/pages/others/foremployers";
import ForgotPasswordPage from "@/pages/others/forgotpassword";
import HowItWorkPage from "@/pages/others/how-it-work";
import InvoicePage from "@/pages/others/invoice";
import LoginPage from "@/pages/others/login";
import PricingPage from "@/pages/others/pricing";
import RegisterPage from "@/pages/others/register";
import ResetPasswordPage from "@/pages/others/reset-password";
import TermsPage from "@/pages/others/terms";
import CartPage from "@/pages/shop/cart";
import CheckoutPage from "@/pages/shop/checkout";
import OrderCompletedPage from "@/pages/shop/order-completed";
import ShopListPage from "@/pages/shop/shop-list";
import ShopSingleDyanmic from "@/pages/shop/shop-single";
import GoogleCallback from "@/components/auth/GoogleCallback";

export const PublicRoutes = [
  { path: "/", element: <Home /> },
  // { path: "/insights", element: <BlogListpage1 /> },
  { path: "/jobs", element: <JobListPage3 /> },
  // { path: "job-list-v1", element: <JobListPage1 /> },
  { path: "/for-employers", element: <ForEmployer /> },
  { path: "/company", element: <EmployerListPage1 /> },
  { path: "/how-it-work", element: <HowItWorkPage /> },
  { path: "/company/:slug", element: <CompanySingleDynamicV1 /> },
  { path: "/company-details/:id", element: <EmployersSingleV1 /> },

  // { path: "job-list-v3", element: <JobListPage /> },

  // { path: "employers-list-v1", element: <EmployerListPage1 /> },
  { path: "employers-list-v2", element: <EmployerListPage2 /> },
  { path: "employers-list-v3", element: <EmployerListPage3 /> },
  { path: "employers-list-v4", element: <EmployerListPage4 /> },

  { path: "employers-single-v1/:id", element: <EmployersSingleV1 /> },
  { path: "employers-single-v2/:id", element: <EmployersSingleV2 /> },
  { path: "employers-single-v3/:id", element: <EmployersSingleV3 /> },

  { path: "candidates-list-v1", element: <CandidateListPage1 /> },
  { path: "candidates-list-v2", element: <CandidateListPage2 /> },
  { path: "candidates-list-v3", element: <CandidateListPage3 /> },
  { path: "candidates-list-v4", element: <CandidateListPage4 /> },
  { path: "candidates-list-v5", element: <CandidateListPage5 /> },

  { path: "candidates-single-v1/:id", element: <CandidateSingleDynamicV1 /> },
  { path: "candidates-single-v2/:id", element: <CandidateSingleDynamicV2 /> },
  { path: "candidates-single-v3/:id", element: <CandidateSingleDynamicV3 /> },

  { path: "blog-list-v1", element: <BlogListpage1 /> },
  { path: "blog-list-v2", element: <BlogListpage2 /> },
  { path: "blog-list-v3", element: <BlogListpage3 /> },
  { path: "blog-details/:id", element: <BlogDetailsDynamic /> },

  { path: "about", element: <AboutPage /> },
  { path: "pricing", element: <PricingPage /> },
  { path: "faq", element: <FaqPage /> },
  { path: "terms", element: <TermsPage /> },
  { path: "invoice", element: <InvoicePage /> },
  { path: "contact", element: <ContactPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "forgot-password", element: <ForgotPasswordPage /> },
  { path: "reset-password", element: <ResetPasswordPage /> },
  { path: "register", element: <RegisterPage /> },

  // Google OAuth callback route
  { path: "auth/google/callback", element: <GoogleCallback /> },

  {
    /* Shop Routes */
  },
  { path: "shop/shop-list", element: <ShopListPage /> },
  { path: "shop/shop-single/:id", element: <ShopSingleDyanmic /> },
  { path: "shop/cart", element: <CartPage /> },
  { path: "shop/checkout", element: <CheckoutPage /> },
  { path: "shop/order-completed", element: <OrderCompletedPage /> },

  {
    /* 404 */
  },
  { path: "404", element: <NotFoundPage /> },
  { path: "*", element: <NotFoundPage /> },
];
