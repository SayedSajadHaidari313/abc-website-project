import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useGetAllCategoryData } from "@/queries/website.query/category.query";

const SearchForm3 = () => {
  const { data } = useGetAllCategoryData();
  // const companyCategory = data?.data || [];

  const companyCategory = data?.data || [];
  const parentCategories = companyCategory.filter(
    (item) => item.category_parent_id === null
  );

  const options = parentCategories?.map((option) => ({
    value: option.id,
    label: option.category_name || "",
  }));

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
    const params = new URLSearchParams();
    params.set("page", "1");

    // Only add parameters if they have values
    if (searchInput?.trim()) {
      params.set("search", searchInput.trim());
    }
    if (locationInput?.trim()) {
      params.set("location", locationInput.trim());
    }
    if (categoryInput) {
      params.set("category", categoryInput);
    }

    navigate(`/listing?${params.toString()}`);
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
            placeholder="Category"
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
