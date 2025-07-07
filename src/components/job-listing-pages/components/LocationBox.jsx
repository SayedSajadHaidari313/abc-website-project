const LocationBox = ({ location, setLocation }) => {
  const locationHandler = (e) => {
    setLocation(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        name="listing-search"
        placeholder="City or postcode"
        value={location}
        onChange={locationHandler}
      />
      <span className="icon flaticon-map-locator"></span>
    </>
  );
};

export default LocationBox;
