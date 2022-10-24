import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {

  const [weatherData, setweatherData] = useState({});
  const key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${key}`)
      .then(Response => setweatherData(Response.data));
  }, [country, key]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}<br /> area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.keys(country.languages).map(k => {
          return (
            <li key={k}>{country.languages[k]}</li>
          );
        })}
      </ul>
      <img src={country.flags.png} alt={`The flag of ${country.name.common}`} />
      <Weather data={weatherData} name={country.name.common} />
    </div>
  );
}

const Countries = ({ countries, handler }) => {
  return (
    countries.length > 10 ? <p>Too many matches, specify another filter</p>
      : countries.length === 1 ? <Country country={countries[0]} />
        : countries.map(c => {
          return (
            <div key={c.name.official}>
              {c.name.common} <button onClick={() => handler(c.name.common)}>show</button>
            </div>
          );
        }));
}


const Weather = ({ data, name }) => {
  return (
    Object.keys(data).length <= 0 ? <></>
      :<div>
        <h2>Weather in {name}</h2>
        <p>temperature {(5.0 / 9.0) * (data.main.temp - 32)} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='Weather icon' />
        <p>wind {data.wind.speed} m/s</p>
      </div>
  )
}

export { Countries };