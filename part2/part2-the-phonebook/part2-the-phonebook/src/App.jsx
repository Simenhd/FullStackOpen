import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './services/phonebook'

const App = () => {

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  console.log('render', persons.length, 'notes')

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    } else if (persons.some((person) => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
      setNewNumber("");
      setNewName("");
      return;
    }
    personService.create(nameObject).then((createdPerson) => {
      setPersons((prevPersons) => prevPersons.concat(createdPerson));
      setNewNumber("");
      setNewName("");
    });
  };

  const handleDeletePerson = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) {
      return;
    }

    personService
      .remove(id)
      .then(() => {
        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== id)
        );
      })
      .catch((error) => {
        console.error(`Failed to delete ${name}`, error);
      });
  };

  const personsToShow =
    searchTerm === ""
      ? persons
      : persons.filter((person) => person.name.includes(searchTerm));

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search the phonebook</h3>
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
        onSubmit={addName}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;
