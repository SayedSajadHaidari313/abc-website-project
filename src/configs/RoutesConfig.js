import React from "react";


export const PublicRoutes = [
  {
    id: 1,
    items: [
      {
        name: "Home Page 01",
        routePath: "/",
      },
    ],
  },
  {
    id: 1,
    title: "Jobs Listing",
    items: [
      {
        name: "Job List V3",
        routePath: "/job-list-v3",
      },
    ],
  },
  {
    id: 1,
    title: "Employers List",
    items: [
      {
        name: "Employers List V3",
        routePath: "/employers-list-v3",
      },
    ],
  },
  {
    id: 2,
    title: "Employers Single",
    items: [
      {
        name: "Employers Single V3",
        routePath: "/employers-single-v3/3",
      },
    ],
  },
  {
    id: 1,
    title: "Candidates List",
    items: [
      {
        name: "Candidates List V1",
        routePath: "/candidates-list-v1",
      },
      {
        name: "Candidates List V2",
        routePath: "/candidates-list-v2",
      },
      {
        name: "Candidates List V3",
        routePath: "/candidates-list-v3",
      },
      {
        name: "Candidates List V4",
        routePath: "/candidates-list-v4",
      },
      {
        name: "Candidates List V5",
        routePath: "/candidates-list-v5",
      },
    ],
  },

  {
    id: 2,
    title: "Candidates Single",
    items: [
      {
        name: "Candidates Single V1",
        routePath: "/candidates-single-v1/1",
      },
      {
        name: "Candidates Single V2",
        routePath: "/candidates-single-v2/2",
      },
      {
        name: "Candidates Single V3",
        routePath: "/candidates-single-v3/3",
      },
    ],
  },

  {
    name: "Blog List V1",
    routePath: "/blog-list-v1",
  },
  {
    name: "Blog List V2",
    routePath: "/blog-list-v2",
  },
  {
    name: "Blog List V3",
    routePath: "/blog-list-v3",
  },
  {
    name: "Blog Details",
    routePath: "/blog-details/1",
  },

  {
    name: "About",
    routePath: "/about",
  },
  {
    name: "Pricing",
    routePath: "/pricing",
  },
  {
    name: "FAQ's",
    routePath: "/faq",
  },
  {
    name: "Terms",
    routePath: "/terms",
  },
  {
    name: "Invoice",
    routePath: "/invoice",
  },
  {
    name: "Contact",
    routePath: "/contact",
  },
  {
    name: "404",
    routePath: "/404",
  },

  {
    id: 1,
    title: "Shop",
    items: [
      {
        name: "Shop List",
        routePath: "/shop/shop-list",
      },
      {
        name: "Shop Single",
        routePath: "/shop/shop-single/1",
      },
      {
        name: "Cart",
        routePath: "/shop/cart",
      },
      {
        name: "Checkout",
        routePath: "/shop/checkout",
      },
      {
        name: "Order Completed",
        routePath: "/shop/order-completed",
      },
      {
        name: "Login",
        routePath: "/login",
      },
      {
        name: "Register",
        routePath: "/register",
      },
    ],
  },

  {
    key: "contact",
    path: `${SITE_PREFIX_PATH}/contact`,
    component: React.lazy(() =>
      import("views/website-views/pages/ContactPage")
    ),
  },
];

export const kdkdkdk = [
  {
    id: 2,
    name: "Company Profile",
    icon: "la-user-tie",
    routePath: "/employers-dashboard/company-profile",
    active: "",
  },
  {
    id: 3,
    name: "Post a New Job",
    icon: "la-paper-plane",
    routePath: "/employers-dashboard/post-jobs",
    active: "",
  },
  {
    id: 4,
    name: "Manage Jobs",
    icon: "la-briefcase",
    routePath: "/employers-dashboard/manage-jobs",
    active: "",
  },
  {
    id: 5,
    name: "All Applicants",
    icon: "la-file-invoice",
    routePath: "/employers-dashboard/all-applicants",
    active: "",
  },
  {
    id: 6,
    name: "Shortlisted Resumes",
    icon: "la-bookmark-o",
    routePath: "/employers-dashboard/shortlisted-resumes",
    active: "",
  },
  {
    id: 7,
    name: "Packages",
    icon: "la-box",
    routePath: "/employers-dashboard/packages",
    active: "",
  },
  {
    id: 8,
    name: "Messages",
    icon: "la-comment-o",
    routePath: "/employers-dashboard/messages",
    active: "",
  },
  {
    id: 9,
    name: "Resume Alerts",
    icon: "la-bell",
    routePath: "/employers-dashboard/resume-alerts",
    active: "",
  },
  {
    id: 10,
    name: "Change Password",
    icon: "la-lock",
    routePath: "/employers-dashboard/change-password",
    active: "",
  },
  {
    id: 11,
    name: "Logout",
    icon: "la-sign-out",
    routePath: "/login",
    active: "",
  },
  {
    id: 12,
    name: "Delete Profile",
    icon: "la-trash",
    routePath: "/",
    active: "",
  },
  {
    id: 1,
    name: "Dashboard",
    icon: "la-home",
    routePath: "/candidates-dashboard/dashboard",
    active: "active",
  },
  {
    id: 2,
    name: "My Profile",
    icon: "la-user-tie",
    routePath: "/candidates-dashboard/my-profile",
    active: "",
  },
  {
    id: 3,
    name: "My Resume",
    icon: "la la-file-invoice",
    routePath: "/candidates-dashboard/my-resume",
    active: "",
  },
  {
    id: 4,
    name: "Applied Jobs",
    icon: "la-briefcase",
    routePath: "/candidates-dashboard/applied-jobs",
    active: "",
  },
  {
    id: 5,
    name: "Job Alerts",
    icon: "la la-bell",
    routePath: "/candidates-dashboard/job-alerts",
    active: "",
  },
  {
    id: 6,
    name: "Shortlisted Jobs",
    icon: "la-bookmark-o",
    routePath: "/candidates-dashboard/short-listed-jobs",
    active: "",
  },
  {
    id: 7,
    name: "CV manager",
    icon: "la la-file-invoice",
    routePath: "/candidates-dashboard/cv-manager",
    active: "",
  },
  {
    id: 8,
    name: "Packages",
    icon: "la-box",
    routePath: "/candidates-dashboard/packages",
    active: "",
  },
  {
    id: 9,
    name: "Messages",
    icon: "la-comment-o",
    routePath: "/candidates-dashboard/messages",
    active: "",
  },
  {
    id: 10,
    name: "Change Password",
    icon: "la-lock",
    routePath: "/candidates-dashboard/change-password",
    active: "",
  },
  {
    id: 11,
    name: "Logout",
    icon: "la-sign-out",
    routePath: "/login",
    active: "",
  },
  {
    id: 12,
    name: "Delete Profile",
    icon: "la-trash",
    routePath: "/",
    active: "",
  },

  {
    key: "attendanceHistory",
    path: `${APP_PREFIX_PATH}/attendances/historyAttendance`,
    component: React.lazy(() =>
      import("views/app-views/attendances/historyAttendance")
    ),
  },
];
