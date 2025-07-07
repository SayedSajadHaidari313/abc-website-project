import Categories from "../components/Categories";
import JobType from "../components/JobType";
import LocationBox from "../components/LocationBox";
import SearchBox from "../components/SearchBox";

const FilterSidebar = ({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  category,
  setCategory,
}) => {
  return (
    <div className="inner-column">
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
            <SearchBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
        {/* <!-- Filter Block --> */}

        <div className="filter-block">
          <h4>Location</h4>
          <div className="form-group">
            <LocationBox location={location} setLocation={setLocation} />
          </div>
        </div>
        {/* <!-- Filter Block --> */}

        <div className="filter-block">
          <h4>Category</h4>
          <div className="form-group">
            <Categories category={category} setCategory={setCategory} />
          </div>
        </div>
        {/* <!-- Filter Block --> */}
      </div>
      {/* Filter Outer */}
    </div>
  );
};

export default FilterSidebar;
