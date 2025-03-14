import personUtils from "../services/people";

export const People = ({ people, setPeople }) => {
  const handleDeletePerson = (id) => {
    const person = people.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personUtils.deletePerson(id).then(() => {
        setPeople(people.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <>
      {people.map(({ id, name, number }) => (
        <div key={id}>
          {name}: {number}
          <button onClick={() => handleDeletePerson(id)}>Delete</button>
        </div>
      ))}
    </>
  );
};
