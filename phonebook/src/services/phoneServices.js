import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

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

export default { getAll, create, deletePerson }