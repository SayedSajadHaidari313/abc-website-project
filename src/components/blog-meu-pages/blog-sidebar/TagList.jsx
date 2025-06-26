import { Link } from "react-router-dom";

const TagList = () => {
  const tagContent = [
    "app",
    "administrative",
    "android",
    "wordpress",
    "design",
    "react",
  ];

  return (
    <>
      {tagContent.map((item, i) => (
        <li key={i}>
          <Link to="#">{item}</Link>
        </li>
      ))}
    </>
  );
};

export default TagList;
