import { useState } from "react";
import Phonebook from "./components/Phonebook";
import Filter from "./components/Filter";
import Addperson from "./components/Addperson";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFilter] = useState("");
  const [tempPerson, setTempPerson] = useState([]);

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setTempPerson(response.data);
    });
  };

  useEffect(hook, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value.replace(/[^0-9.\-]|e[+\-]?[0-9]+/g, ""));
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (
      JSON.stringify(persons.map((existing) => existing.name)).includes(
        JSON.stringify(newName.replace(/\s+$/, ""))
      )
    ) {
      alert(`${newName.replace(/\s+$/, "")} is already added to phonebook.`);
    } else if (!newNumber.trim() || !newName.trim()) {
      alert(
        `Name and/or number entry is empty. Please enter missing information.`
      );
    } else {
      const phoneObject = {
        name: newName.replace(/\s+$/, ""),
        number: newNumber,
      };

      setPersons(persons.concat(phoneObject));
      setTempPerson(persons.concat(phoneObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    if (e.target.value.trim().length > 0 && e.key !== "Backspace") {
      const regex = new RegExp(e.target.value, "i");
      const filtered = () =>
        persons.filter((person) => person.name.match(regex));
      setPersons(filtered);
    } else if (e.key === "Backspace" && e.target.value.trim().length > 0) {
      const regex = new RegExp(e.target.value, "i");
      const filtered = () =>
        tempPerson.filter((person) => person.name.match(regex));
      setPersons(filtered);
    } else {
      setPersons(tempPerson);
    }
  };

  return (
    <div>
      <div></div>
      <h2>Phonebook</h2>
      <Filter filter={filtered} handleFilterChange={handleFilterChange} />
      <div></div>
      <h2>Add a new</h2>
      <Addperson
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <Phonebook key={i} person={person} />
      ))}
    </div>
  );
};

export default App;
