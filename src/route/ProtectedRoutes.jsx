import CompanyProfileEmploeeDBPage from "@/pages/employers-dashboard/company-profile";
import DashboardEmploeeDBPage from "@/pages/employers-dashboard/dashboard";
import ManageJobsEmploeeDBPage from "@/pages/employers-dashboard/manage-jobs";
import PostJobsEmploeeDBPage from "@/pages/employers-dashboard/post-jobs";
import AllApplicantsEmploeesPage from "@/pages/employers-dashboard/all-applicants";
import ShortListedResumeEmploeeDBPage from "@/pages/employers-dashboard/shortlisted-resumes";
import PackageEmploeeDBPage from "@/pages/employers-dashboard/packages";
import MessageEmploeeDBPage from "@/pages/employers-dashboard/messages";
import ResumeAlertsEmploeeDBPage from "@/pages/employers-dashboard/resume-alerts";
import ChangePasswordEmploeeDBPage from "@/pages/employers-dashboard/change-password";

import DashboardPage from "@/pages/candidates-dashboard/dashboard";
import AppliedJobsPage from "@/pages/candidates-dashboard/applied-jobs";
import JobAlertPage from "@/pages/candidates-dashboard/job-alerts";
import MyProfilePage from "@/pages/candidates-dashboard/my-profile";
import ShortListedJobsPage from "@/pages/candidates-dashboard/short-listed-jobs";
import Logout from "@/components/common/logout/Logout";
import RfpPostPage from "@/pages/candidates-dashboard/rfp-posts";
import InsightRanksPage from "@/pages/candidates-dashboard/insight-ranks";
import InsightArchivesPage from "@/pages/candidates-dashboard/insight-archives";
// import InsightHubsPage from "@/pages/candidates-dashboard/insight-hubs";
// import ProfessionalCommunityPage from "@/pages/candidates-dashboard/professional-community";
import DeleteAccount from "@/components/dashboard-pages/candidates-dashboard/DeleteAccount";
import JobMatchedPage from "@/pages/candidates-dashboard/job-matched";
import CvBankPages from "@/pages/employers-dashboard/cv-banks";


// Employer Protected Routes
export const EmployerProtectedRoutes = [
  { path: "/employer/dashboard", element: <DashboardEmploeeDBPage /> },
  {
    path: "/employer/company-profile",
    element: <CompanyProfileEmploeeDBPage />,
  },
  { path: "/employer/post-jobs", element: <PostJobsEmploeeDBPage /> },
  { path: "/employer/manage-jobs", element: <ManageJobsEmploeeDBPage /> },
  { path: "/employer/all-applicants", element: <AllApplicantsEmploeesPage /> },
  { path: "/employer/cv-banks", element: <CvBankPages /> },
  {
    path: "/employer/shortlisted-resumes",
    element: <ShortListedResumeEmploeeDBPage />,
  },
  { path: "/employer/packages", element: <PackageEmploeeDBPage /> },
  { path: "/employer/messages", element: <MessageEmploeeDBPage /> },
  { path: "/employer/resume-alerts", element: <ResumeAlertsEmploeeDBPage /> },
  {
    path: "/employer/change-password",
    element: <ChangePasswordEmploeeDBPage />,
  },
  { path: "/employer/logout", element: <Logout /> }, // این مسیر رو اضافه کن
];

// User Protected Routes
export const UserProtectedRoutes = [
  { path: "candidate/dashboard", element: <DashboardPage /> },
  { path: "candidate/applied-jobs", element: <AppliedJobsPage /> },
  { path: "candidate/job-alerts", element: <JobAlertPage /> },
  { path: "candidate/my-profile", element: <MyProfilePage /> },
  { path: "candidate/post-new-rfps", element: <RfpPostPage /> },
  { path: "candidate/insight-ranks", element: <InsightRanksPage /> },
  { path: "candidate/insight-archives", element: <InsightArchivesPage /> },
  // { path: "candidate/insight-hub", element: <InsightHubsPage /> },
  // { path: "candidate/community", element: <ProfessionalCommunityPage /> },
  { path: "candidate/matched-jobs", element: <JobMatchedPage /> },
  { path: "candidate/short-listed-jobs", element: <ShortListedJobsPage /> },
  { path: "candidate/delete-account", element: <DeleteAccount /> },
  { path: "candidate/logout", element: <Logout /> },
];


export const ProtectedRoutes = [
  ...EmployerProtectedRoutes,
  ...UserProtectedRoutes,
];
