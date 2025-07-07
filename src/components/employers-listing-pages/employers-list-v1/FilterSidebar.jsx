import CallToActions from "../components/CallToActions";
import SearchBox from "../components/SearchBox";
import Advertisement from "@/components/advertisement/Advertisement";

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
      {/* <!-- End Call To Action --> */}
    </div>
  );
};

export default FilterSidebar;
