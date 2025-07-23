import CallToActions from "../components/CallToActions";
import SearchBox from "../components/SearchBox";
import Advertisement from "@/components/advertisement/Advertisement";
import AdBlockDisplay from "@/components/common/AdBlockDisplay";

const FilterSidebar = () => {
  return (
    <div className="inner-column pd-right">
      <div className="filters-outer">
        <button
          type="button"
          className="btn-close text-reset close-filters show-1023"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        {/* End .close filter */}

        <div className="filter-block">
          <h4>Search by Keywords</h4>
          <div className="form-group">
            <SearchBox />
          </div>
        </div>
        {/* <!-- Filter Block --> */}

        {/* <!-- Filter Block --> */}
      </div>
      {/* Filter Outer */}

      <CallToActions />

      <Advertisement />
      <div
        style={{
          margin: "32px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AdBlockDisplay position="left_side" />
      </div>
      {/* <!-- End Call To Action --> */}
    </div>
  );
};

export default FilterSidebar;
