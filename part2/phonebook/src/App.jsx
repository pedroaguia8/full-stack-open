import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

    const personObject = { name: newName, number: newNumber }

    // If person with same name exists update number
    if ((persons.findIndex((person) => person.name === newName)) !== -1) {
      if (window.confirm(`Person with name ${newName} is already added to phonebook. Update?`))
        updatePerson(persons.find((person) => person.name === newName).id, personObject);
      return;
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');

        setSuccessMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      })
      .catch(error => {
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      })
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id));

          setSuccessMessage(`Deleted ${person.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);
        })
        .catch(() => {
          setErrorMessage(`Information of ${person.name} has already been removed from the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);

          setPersons(persons.filter(p => p.id !== person.id));
        })
    }
  }

  const updatePerson = (id, personObject) => {
    personService
      .update(id, personObject)
      // We need to receive a newPerson object here because
      // a new id is generated when the person is updated on the db
      .then((newPerson) => {
        setPersons(persons.map((person) => person.id === id ? newPerson : person));

        setSuccessMessage(`Updated ${newPerson.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      })
      .catch(error => {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        }
        if (error.response.status === 404) {
          setErrorMessage(`Information of ${personObject.name} has already been removed from the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
          setPersons(persons.filter(p => p.id !== id));
        }
      })
  }

  useEffect(() => {
    personService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons);
      })
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />

    </div>
  )
}

export default App