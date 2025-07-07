const SearchBox = ({ searchQuery, setSearchQuery }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        name="listing-search"
        placeholder="Job title, keywords, or company"
        value={searchQuery}
        onChange={handleSearch}
      />
      <span className="icon flaticon-search-3"></span>
    </>
  );
};

export default SearchBox;
