import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {

  const [weatherData, setweatherData] = useState(null);

  console.log('start');
  useEffect(() => {
    console.log('here');
    const key = process.env.REACT_APP_API_KEY;
    const lat = country.latlng[0];
    const lon = country.latlng[1];
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    axios
      .get(url)
      .then(Response => setweatherData(Response.data));
  }, []);

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
  const src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  return (
    <div>
      <h2>Weather in {name}</h2>
      <p>temperature {(5.0 / 9.0) * (data.main.temp - 32)} Celcius</p>
      <img src={src} alt='Weather icon' />
      <p>wind {data.wind.speed} m/s</p>
    </div>
  )
}

export { Countries };