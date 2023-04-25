const Filter = (props) => {
  return (
    <>
      Filter shown with{" "}
      <input
        onKeyUp={props.handleFilterChange}
        type="text"
        placeholder="search here"
        value={props.filter}
        onChange={props.handleFilterChange}
      />
      <form onSubmit={props.addPerson}></form>
    </>
  );
};

export default Filter;
