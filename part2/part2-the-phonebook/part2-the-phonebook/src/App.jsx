import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const addName = event => {
    event.preventDefault()
    const nameObject= {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      
    } else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      setNewNumber('')
      return
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = searchTerm === ''
    ? persons
    : persons.filter(person => person.name.includes(searchTerm))

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search the phonebook</h3>
      <div>
        filter shown with <input 
          value= {searchTerm} 
          onChange = {handleSearchChange}
        />
      </div>
      <h3>Add a new</h3>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange = {handleNameChange}
          />
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <ul>
        {personsToShow.map(person => 
          <li key={person.id}>{person.name} {person.number}</li>  
        )}
      </ul>
    </div>
  )
}

export default App