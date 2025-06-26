import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const [locationInput, setLocationInput] = useState(
    searchParams.get("location") || ""
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    setSearchParams({
      page: "1",
      search: searchInput,
      location: locationInput,
    });

    // Clear fields after search
    setSearchInput("");
    setLocationInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-5 col-md-12 col-sm-12">
          <span className="icon flaticon-search-1"></span>
          <input
            type="text"
            name="field_name"
            placeholder="Job title, keywords, or company"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="form-group col-lg-4 col-md-12 col-sm-12 location">
          <span className="icon flaticon-map-locator"></span>
          <input
            type="text"
            name="field_location"
            placeholder="City or province"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
        </div>

        <div className="form-group col-lg-3 col-md-12 col-sm-12 btn-box">
          <button type="submit" className="theme-btn btn-style-one">
            <span className="btn-title">Find Jobs</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
