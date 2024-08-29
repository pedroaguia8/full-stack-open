import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
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
      setNewNumber('');
    }
  }

  useEffect(() => {
    axios.get('http://localhost:3002/persons').then(response => {
      setPersons(response.data);
    })
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />

    </div>
  )
}

export default App