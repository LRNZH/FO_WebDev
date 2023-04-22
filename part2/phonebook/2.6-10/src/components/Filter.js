const Filter = (props) => {
  return (
    <>
      filter shown with{" "}
      <input
        type="text"
        placeholder="Search here"
        value={props.filter}
        onChange={props.handleFilterChange}
      />
      <form onSubmit={props.addPerson}></form>
    </>
  );
};


export default Filter;