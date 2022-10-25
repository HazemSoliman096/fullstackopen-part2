import axios from "axios";

const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl);
}

const create = (data) => {
  return axios.post(baseUrl, data);
}

const deletePerson = (id) => {
  console.log(id);
  return axios.delete(`${baseUrl}/${id}`);
}


const updatePerson = (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person);
}

export default { getAll, create, deletePerson, updatePerson }