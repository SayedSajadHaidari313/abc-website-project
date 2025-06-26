import PopularSearch from "../PopularSearch";
import SearchForm3 from "@/components/common/job-search/SearchForm3";

const index = () => {
  return (
    <>
      <section className="banner-section ">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-9 col-md-12 col-sm-12 m-0 m-auto">
              <div
                className="inner-column"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div
                  className="title-box"
                  data-aso-delay="500"
                  data-aos="fade-up"
                >
                  <h3 className=" text-center">Discover Opportunities. Share Your Insight. Land Your Next Job!
                  </h3>
                </div>

                {/* <!-- Job Search Form --> */}
                <div
                  className="job-search-form"
                  data-aos-delay="700"
                  data-aos="fade-up"
                >
                  <SearchForm3 btnStyle="btn-style-two" />
                </div>
                {/* <!-- Job Search Form --> */}

                {/* <!-- Popular Search --> */}
                <PopularSearch />
                {/* <!-- End Popular Search --> */}
              </div>
            </div>
            {/* End .col */}
            {/* 
            <div className="image-column col-lg-5 col-md-12">
              <ImageBox />
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
