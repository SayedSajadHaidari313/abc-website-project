// import { Button } from "antd";
// import { UserAddOutlined, SolutionOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";

// const GetStarted = () => {
//   return (
//     <section className="py-5 mt-5" data-aos="fade-up">
//       <div className="auto-container text-center px-3 px-md-5">
//         <h2 className="fw-bold mb-3">Ready to Get Started?</h2>
//         <p className="text-muted fs-5 mb-4">
//           Join <strong>InsightDeed</strong> today to share your expertise, build credibility, and discover opportunities that match your professional knowledge.
//         </p>

//         <div className="d-flex justify-content-center flex-wrap gap-3">
//           <Button
//             type="primary"
//             size="large"
//             icon={<UserAddOutlined />}
//             className="rounded-pill px-4"
//           >
//              <Link to="/register">Create Your Account</Link> 
//           </Button>

//           <Button
//             type="default"
//             size="large"
//             icon={<SolutionOutlined />}
//             className="rounded-pill px-4"
//           >
//             Employer Solutions
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GetStarted;


import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <section
      className="call-to-action-two style-two"
      style={{ backgroundImage: "url(/images/background/4.jpg)" }}
    >
      <div className="auto-container" data-aos="fade-up">
        <div className="sec-title light text-center">
          <h2>Ready to Get Started?</h2>
          <div className="text">
                 Join <strong>InsightDeed</strong> today to share your expertise, build credibility, and discover opportunities that match your professional knowledge.
          </div>
        </div>

        <div className="btn-box">
          <Link to="/register" className="theme-btn btn-style-three">
            Create Your Account
          </Link>
        </div>
        <div className="btn-box">
          <Link to="/for-employers" className="theme-btn btn-style-three">
            Employer Solutions
          </Link>
        </div>
      </div>
    </section>
    //   <!-- End Call To Action -->
  );
};

export default GetStarted;

