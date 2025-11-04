const Person = ({ person, onDelete }) => {
    return (
        <li>
            {person.name} {person.number} <button type="button" onClick={onDelete}>Delete</button>
      </li>
    )
  }
  
  export default Person
  
