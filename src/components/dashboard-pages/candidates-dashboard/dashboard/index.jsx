import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
import CopyrightFooter from "../../CopyrightFooter";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import Profile from "./components/Profile";
import RecentInsightBox from "./components/recent-insight/RecentInsightBox";
import { Link } from "react-router-dom";
import RecentJobsBox from "./components/recent-job/RecentJobsBox";

const Index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardCandidatesSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Dashboard" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}
          {/* Profile Show in dashboard */}
          <div className="row">
            <Profile />
          </div>

          <div className="row">
            <TopCardBlock />
          </div>
          {/* End .row top card block */}

          {/* recent insight show in db */}
          <div className="row mb-4">
            <div className="col-12 d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Recent Insights</h4>
              {/* Optional: Add View All link */}
              <Link to="/insights" className="text-primary small">
                View All
              </Link>
            </div>

            <div className="col-12">
              <div className="bg-white p-3 rounded shadow-sm">
                <RecentInsightBox />
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12 d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Recent Jobs Matched</h4>
              {/* Optional: Add View All link */}
              <Link to="/jobs" className="text-primary small">
                View All
              </Link>
            </div>

            <div className="col-12">
              <div className="bg-white p-3 rounded shadow-sm">
                <RecentJobsBox />
              </div>
            </div>
          </div>

        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default Index;
