import { Link } from "react-router-dom";

const Breadcrumb = ({ title = "", meta = "" }) => {
  return (
    <section className="page-title">
      <div className="auto-container">
        <div className="title-outer">
          <h1>{title}</h1>
          <ul className="page-breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{meta}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
