import { useEffect, useState } from 'react';
import './index.css';
import { Persons } from './components/Persons';
import { Filter } from './components/Filter';
import axios from 'axios';
import personUtils from './services/persons';
import { Notification } from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personUtils
      .getAllPersons()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleShowMessage = (name) => {
    setMessage({
      text: `${name} has been added to the phonebook.`,
      messageType: 'success',
    });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Do you want to update their number?`
        )
      ) {
        personUtils
          .updatePerson(existingPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
          })
          .catch((error) => {
            console.error('Error:', error);
            setMessage({
              text: `Cannot update. ${existingPerson.name} has already been removed from the phonebook.`,
              messageType: 'error',
            });
          });
      }
      return;
    }

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then((response) => {
        setPersons([...persons, response.data]);
        handleShowMessage(newPerson.name);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        filter={filter}
        setFilter={setFilter}
      />
      <form onSubmit={handleAddPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
