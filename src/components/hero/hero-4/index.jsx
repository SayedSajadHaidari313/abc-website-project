import SearchForm3 from "../../common/job-search/SearchForm3";

const index = () => {
  return (
    <section
      className="banner-section-four"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Modern overlay with blur effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(14, 165, 233, 0.85) 0%, rgba(59, 130, 246, 0.75) 50%, rgba(99, 102, 241, 0.8) 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />
      {/* Content wrapper to ensure it's above the overlay */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="auto-container">
          <div className="cotnent-box" style={{ marginTop: 70 }}>
            <div className="title-box" data-aso-delay="500" data-aos="fade-up">
              <h3>Beggist Business Directory in Afghanistan</h3>
            </div>

            {/* <!-- Job Search Form --> */}
            <div
              className="job-search-form"
              data-aos-delay="700"
              data-aos="fade-up"
            >
              <SearchForm3 btnStyle="btn-style-two" />
            </div>
          </div>
          {/* <!-- Job Search Form --> */}

          {/* <!-- Popular Search --> */}
          {/* <PopularSearch /> */}
          {/* <!-- End Popular Search --> */}
        </div>
      </div>
    </section>
  );
};

export default index;
