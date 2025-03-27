import { useEffect, useState } from "react";
import { People } from "./components/People";
import { Filter } from "./components/Filter";
import personUtils from "./services/people";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const initialPeople = await personUtils.getAllPeople();
        setPeople(initialPeople);
      } catch (error) {
        alert("Failed to fetch notes", error);
      }
    }
    fetchData();
  }, []);

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleAddPerson = (event) => {
    event.preventDefault();
    const existingPerson = people.find(
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
            console.log(updatedPerson);
            setPeople(
              people.map((person) =>
                person.id === updatedPerson.id ? newPerson : person
              )
            );
          });
      }
    } else {
      personUtils
        .createPerson(newPerson)
        .then((response) => {
          setPeople([...people, response]);
        })
        .catch((error) => {
          console.error("Error:", error.response.data.error);
          setMessage(error.response.data.error);
        });
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>{message}</div>
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
      <People
        people={filteredPeople}
        setPeople={setPeople}
      />
    </div>
  );
};

export default App;
