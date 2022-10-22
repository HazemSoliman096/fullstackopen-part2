const Country = ({ country }) => {
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
    </div>
  );
}

const Countries = ({ countries, handler }) => {
  return (
    countries.length > 10 ? <p>Too many matches, specify another filter</p>
      : countries.length === 1 ? <Country country={countries[0]} />
        : countries.map(c => {
          return (
            <div>
              {c.name.common} <button key={c.name.official} onClick={() => handler(c.name.common)}>show</button>
            </div>
          );
        }));
}

export { Countries };