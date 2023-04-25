const Phonebook = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <>
        <button onClick={() => deletePerson(person.id)}>delete</button>
      </>
    </div>
  );
};

export default Phonebook;
