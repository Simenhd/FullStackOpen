import Person from "./Person";

const Persons = ({ persons, onDelete }) => {
    return (
        <ul>
        {persons.map((person) => (
          <Person
            key={person.id}
            person={person}
            onDelete={() => onDelete(person.id, person.name)}
          />
        ))}
      </ul>
    )
  }
  
  export default Persons
  
