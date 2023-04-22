import { useState, useEffect } from "react";
import Phonebook from "./components/Phonebook";
import Filter from "./components/Filter";
import Addperson from "./components/Addperson";
import phoneService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFilter] = useState("");
  const [tempPerson, setTempPerson] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    phoneService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setTempPerson(initialPersons);
    });
  }, []);

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
      ) &&
      newNumber.trim().length > 0
    ) {
      if (
        window.confirm(
          `${newName.replace(
            /\s+$/,
            ""
          )} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const markedPerson = persons.filter(
          (pe) => pe.name === newName.replace(/\s+$/, "")
        );
        const updatedPerson = { ...markedPerson[0], number: newNumber };

        phoneService
          .update(updatedPerson.id, updatedPerson)
          .then((update) => {
            setPersons(
              persons.map((pp) => (pp.id !== markedPerson.id ? pp : update))
            );
            setNewName("");
            setNewNumber("");
            setErrorMessage(
              `${newName.replace(/\s+$/, "")}'s number has been replaced`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 4000);
          })
          .catch((error) => {
            console.log(error);
            setPersons(persons.filter((pp) => pp.id !== updatedPerson.id));
            setNewName("");
            setNewNumber("");
            setErrorMessage(
              `ERROR: ${updatedPerson.name} was already deleted from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 4000);
          });
      }
    } else if (!newNumber.trim() || !newName.trim()) {
      setErrorMessage(
        `Name and(or) number entry are(is) empty. Please enter missing information.`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    } else {
      const phoneObject = {
        name: newName.replace(/\s+$/, ""),
        number: newNumber,
      };

      phoneService
        .add(phoneObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setTempPerson(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");
          setErrorMessage(`${phoneObject.name} has been added!`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);
        })
        .catch((error) => {
          setErrorMessage(`ERROR: ${error.response.data.error}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);
        });
    }
  };

  const deletePerson = (id) => {
    const delPerson = persons.filter((p) => p.id === id);
    if (window.confirm(`Delete ${delPerson[0].name} ?`)) {
      phoneService.remove(delPerson[0].id);
      setPersons(persons.filter((pers) => pers.id !== delPerson[0].id));
      setTempPerson(persons.filter((pers) => pers.id !== delPerson[0].id));
      setErrorMessage(`${delPerson[0].name} has been deleted!`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
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
      <Notification message={errorMessage} />
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
        <Phonebook key={i} person={person} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

export default App;
