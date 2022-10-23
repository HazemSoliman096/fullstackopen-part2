import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl);
}

const create = (data) => {
  return axios.post(baseUrl, data);
}

export default { getAll, create }