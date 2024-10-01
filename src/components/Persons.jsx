import personUtils from '../services/persons';

export const Persons = ({ persons, setPersons }) => {
  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personUtils.deletePerson(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <>
      {persons.map(({ id, name, number }) => (
        <div key={id}>
          {name}: {number}
          <button onClick={() => handleDeletePerson(id)}>Delete</button>
        </div>
      ))}
    </>
  );
};
