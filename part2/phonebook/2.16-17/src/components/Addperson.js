const Addperson = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        Name:{" "}
        <input
          type="text"
          placeholder="enter name"
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        Number:{" "}
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
