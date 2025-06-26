import { Link } from "react-router-dom";

const Categories = () => {
  const catContent = [
    "Education",
    "Information",
    "Interview",
    "Job Seeking",
    "Jobs",
    "Learn",
    "Skill",
    "Travel",
  ];
  return (
    <>
      {catContent.map((item, i) => (
        <li key={i}>
          <Link to="#">{item}</Link>
        </li>
      ))}
    </>
  );
};

export default Categories;
