import PropTypes from "prop-types";

const ListingShowing = ({ total, showing, onShowMore }) => {
  const percent = ((showing / total) * 100).toFixed(0);

  return (
    <div className="ls-show-more">
      <p>
        Showing {showing} of {total} Companies
      </p>
      <div className="bar">
        <span className="bar-inner" style={{ width: `${percent}%` }}></span>
      </div>
      {showing < total && (
        <button className="show-more" onClick={onShowMore}>
          Show More
        </button>
      )}
    </div>
  );
};

ListingShowing.propTypes = {
  total: PropTypes.number.isRequired,
  showing: PropTypes.number.isRequired,
  onShowMore: PropTypes.func.isRequired,
}
export default ListingShowing;
