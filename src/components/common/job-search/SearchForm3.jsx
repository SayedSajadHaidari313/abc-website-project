import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { useGetAllCategoryData } from "@/queries/website.query/category.query";

const SearchForm3 = () => {
  const { data } = useGetAllCategoryData();
  const companyCategory = data?.data || [];

  const options = companyCategory?.map((option) => ({
    value: option.id,
    label: option.category_name || "",
  }));

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const [locationInput, setLocationInput] = useState(
    searchParams.get("location") || ""
  );
  const [categoryInput, setCategoryInput] = useState(
    searchParams.get("category") || null
  );

  useEffect(() => {
    // sync from URL if user navigates directly with query params
    setSearchInput(searchParams.get("search") || "");
    setLocationInput(searchParams.get("location") || "");
    setCategoryInput(searchParams.get("category") || null);
  }, [searchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newParams = {
      page: "1",
      search: searchInput,
      location: locationInput,
      category: categoryInput,
    };
    setSearchParams(newParams);
    // Do NOT clear form after search; keep values for user convenience
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {/* Search Input */}
        <div className="form-group col-lg-4 col-md-12 col-sm-12">
          <span className="icon flaticon-search-1"></span>
          <input
            style={{ marginTop: "7px" }}
            type="text"
            placeholder="company, keywords.."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* Location Input */}
        <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
          <span className="icon flaticon-map-locator"></span>
          <input
            style={{ marginTop: "7px" }}
            type="text"
            placeholder="City or province"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <div className="form-group col-lg-3 col-md-12 col-sm-12 category">
          <span className="icon flaticon-briefcase"></span>{" "}
          {/* ✅ Category icon added */}
          <Select
            options={options}
            value={options.find((opt) => opt.value === categoryInput)}
            onChange={(selected) =>
              setCategoryInput(selected ? selected.value : null)
            }
            placeholder="Job Category"
            isClearable
            menuPortalTarget={document.body}
            filterOption={(option, inputValue) => {
              if (!inputValue) return true;
              if (!option.label) return false;
              return option.label
                .toLowerCase()
                .startsWith(inputValue.toLowerCase());
            }}
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "6px",
                color: "#696969",
                boxShadow: "none",
                border: "none",
                paddingLeft: "30px", // Add space for the icon
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
                borderRadius: "6px",
              }),
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="form-group col-lg-2 col-md-12 col-sm-12 text-right">
          <button
            type="submit"
            className="theme-btn btn-style-one"
            style={{ marginTop: "5px" }}
          >
            <span className="btn-title">Find company</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm3;
