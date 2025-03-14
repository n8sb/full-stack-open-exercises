import axios from "axios";
const baseURL = "/api/people";

const getAllPeople = async () => {
  const request = await axios.get(baseURL);
  return request.data;
};

const createPerson = async (data) => {
  const request = await axios.post(baseURL, data);
  return request.data;
};

const updatePerson = async (id, data) => {
  const request = await axios.put(`${baseURL}/${id}`, data);
  return request.data;
};

const deletePerson = (id) => axios.delete(`${baseURL}/${id}`);

export default {
  getAllPeople,
  createPerson,
  updatePerson,
  deletePerson,
};
