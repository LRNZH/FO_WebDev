const Addperson = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name:{" "}
        <input
          type="text"
          placeholder="enter name"
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        number:{" "}
        <input
          type="text"
          placeholder="enter number"
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Addperson;
