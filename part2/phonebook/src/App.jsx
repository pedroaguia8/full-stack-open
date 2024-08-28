import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();

    // If person with same name or number exists
    // throw alert and don't add to phonebook
    if ((persons.findIndex((person) => person.name === newName)) !== -1) {
      alert(`Person with name ${newName} is already added to phonebook`);
    } else if ((persons.findIndex((person) => person.number === newNumber)) !== -1) {
      alert(`Person with number ${newNumber} is already added to phonebook`);
    } else {
      const personObject = { name: newName, number: newNumber }
      setPersons(persons.concat(personObject));
      setNewName('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App