import axios from 'axios';
const baseURL = 'http://localhost:3001/persons';

const getAllPersons = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const createPerson = (newPerson) => {
  const request = axios.post(baseURL, newPerson);
  return request.then((response) => response.data);
};

const updatePerson = (id, updatedPerson) => {
  const request = axios.put(`${baseURL}/${id}`, updatedPerson);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => console.log(response.data));
};

export default {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson,
};
