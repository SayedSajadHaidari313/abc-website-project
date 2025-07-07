import SearchForm3 from "../../common/job-search/SearchForm3";

const index = () => {
  return (
    <section
      className="banner-section-four"
      style={{ backgroundImage: "url(/images/background/5.png)" }}
    >
      <div className="auto-container">
        <div className="cotnent-box">
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
    </section>
  );
};

export default index;
