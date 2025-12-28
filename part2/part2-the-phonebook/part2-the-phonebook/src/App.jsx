import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/phonebook";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [persons, setPhonebook] = useState([]);
  const [notification, setNotification] = useState({message: "", type: ""});

  // Get phonebook records once after initial render
  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPhonebook(initialPersons);
      })
      .catch((error) => {
        setNotification({message: "Failed to fetch initial persons", type: "error"})
      });
  }, []);

  // Log number of persons on each render
  console.log("render", persons.length, "notes");

  // Handlers for input changes
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

  // Handler for deleting a person
  const handleDeletePerson = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) {
      return;
    }

    // Delete person from phonebook
    personService
      .remove(id)
      .then(() => {
        setPhonebook((prevPersons) =>
          prevPersons.filter((person) => person.id !== id)
        );
      })
      .catch((error) => {
        setNotification({message: `Failed to delete ${name}`, type: "error"});
      });
  };

  const addName = (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Validation check
    if (newName.trim() === "" || newNumber.trim() === "") {
      setNotification({message: "Name and number cannot be empty", type: "error" })
      return;
    }

    // Create a new person object
    const personObject = {
      name: newName,
      number: newNumber,
    };

    // Check if name already exists
    const existingPerson = persons.find((person) => person.name === newName);

    // Prompt for update if person exists in phonebook
    if (existingPerson) {
      if (
        !window.confirm(
          `${newName} is already added to the Phonebook, replace the old number with a new one?`
        )
      ) {
        return;
      }
      personService
        .update(existingPerson.id, personObject)
        .then((returnedPerson) => {
          setPhonebook((prevPersons) =>
            prevPersons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
          );
          setNotification({message: `Updated ${returnedPerson.name}'s number`, type: "success" })
        })
        .catch((error) => {
          setNotification({message: `Failed to update ${newName}. Perhaps the person has been deleted from the server already`, type: "error"})
        });
      setNewName("");
      setNewNumber("");
      return;
    }

    // Create new person in phonebook
    personService
      .create(personObject)
      .then((createdPerson) => {
        setPhonebook((prevPersons) => prevPersons.concat(createdPerson));
        setNotification({message: `Added ${createdPerson.name}`, type: "success"})
        setNewNumber("");
        setNewName("");
      })
      .catch((error) => {
        setNotification({message: `Failed to add ${newName}`, type: "error"})
      });
  };

  // Determine persons to show based on search term
  const personsToShow =
    searchTerm === ""
      ? persons
      : persons.filter((person) => person.name.includes(searchTerm));

  // UI 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} />
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
