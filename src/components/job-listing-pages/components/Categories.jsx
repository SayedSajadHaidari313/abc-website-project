const Categories = ({ category, setCategory }) => {
  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <select
        className="form-select"
        value={category}
        onChange={categoryHandler}
      >
        <option value="">Choose a category</option>
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
        <option value="industrial">Industrial</option>
        <option value="apartments">Apartments</option>
      </select>
      <span className="icon flaticon-briefcase"></span>
    </>
  );
};

export default Categories;
