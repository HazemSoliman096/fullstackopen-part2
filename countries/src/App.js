import axios from "axios";
import { useEffect, useState } from "react";

import { Countries } from './Country';

function App() {

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(Response => setCountries(Response.data));
  }, []);

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const showCountry = (country) => setSearchTerm(country);

  const filteredCountries = searchTerm === '' ? [] : countries.filter(c => c.name['common'].toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <div>
        find countries <input onChange={handleSearch} value={searchTerm}></input>
      </div>
      <div>
        <Countries countries={filteredCountries} handler={showCountry}/>
      </div>
    </>
  );
}

export default App;
