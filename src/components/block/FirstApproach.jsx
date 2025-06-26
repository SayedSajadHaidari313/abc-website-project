import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";
const FirstApproach = () => {
  return (
    <section className="steps-section py-5">
      <div className="auto-container">
        <div className="row align-items-center">
          {/* Textual Section */}
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <div className="inner-column" data-aos="fade-right">
              <div className="sec-title mb-4">
                <h2 className="mb-3">The Knowledge-First Approach</h2>
                <p className="text-muted">
                  InsightDeed isn't just another job board or professional
                  network. We've created a platform where sharing professional
                  knowledge is the primary activity, with job matching as a
                  natural outcome.
                </p>
              </div>

              <ul className="list-unstyled">
                <li className="mb-3">
                  <CheckCircleFilled /> <strong>Show, Don't Tell:</strong>
                  <br />
                  Instead of just claiming expertise on a resume, demonstrate it
                  through insights that showcase your professional thinking.
                </li>
                <li className="mb-3">
                  <CheckCircleFilled />{" "}
                  <strong>Build a Knowledge Asset:</strong>
                  <br />
                  Your Insight Archive becomes a valuable professional asset
                  that grows with your career and showcases your expertise.
                </li>
                <li>
                  <CheckCircleFilled /> <strong>Tag-Based Matching:</strong>
                  <br />
                  Our unique tagging system connects your professional insights
                  directly to relevant job opportunities.
                </li>
              </ul>
            </div>
          </div>

          {/* Example Insight Section */}
          <div className="col-lg-6 col-md-12" data-aos="fade-left">
            <div className="example-box p-4 bg-white shadow rounded">
              <h4 className="mb-4 text-primary mt-3">Example Insight</h4>
              <p className="mb-3">
                <strong>
                  What's one leadership lesson you learned this week?
                </strong>
              </p>
              <blockquote className=" border-start ps-3">
                "One leadership lesson I've learned this week: Transparency
                isn't just about sharing information—it's about creating
                context. When team members understand the 'why' behind
                decisions, they're more likely to be engaged and aligned with
                the vision."
              </blockquote>
              <div className="mt-4 ">
                <span className="badge bg-primary me-2">#Leadership</span>
                <span className="badge bg-primary me-2">#TeamManagement</span>
                <span className="badge bg-primary">#Communication</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstApproach;
