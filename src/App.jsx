import { useState } from 'react';
import { Persons } from './components/Persons';
import { Filter } from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAddPerson = (event) => {
    event.preventDefault();
    const personExists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (personExists) {
      alert(`${newName} is already in the phonebook.`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: Math.floor(Math.random() * 100000),
    };
    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
