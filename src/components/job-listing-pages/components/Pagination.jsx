import PropTypes from "prop-types";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  if (!itemsPerPage || itemsPerPage === 0) return null;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <button
            type="button"
            className={i === currentPage ? "current-page" : ""}
            onClick={() => handleClick(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    return pages;
  };

  return (
    <nav className="ls-pagination">
      <ul>
        <li className="prev">
          <button onClick={() => handleClick(currentPage - 1)}>
            <i className="fa fa-arrow-left"></i>
          </button>
        </li>
        {renderPages()}
        <li className="next">
          <button onClick={() => handleClick(currentPage + 1)}>
            <i className="fa fa-arrow-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default Pagination;
