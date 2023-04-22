const Phonebook = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

export default Phonebook;
