import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const [countryList, setCountryList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountryList(response.data))
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const filtered = country
      ? countryList.filter((item) =>
          item.name.common.toLowerCase().includes(country.toLowerCase())
        )
      : [];

    if (filtered.length >= 10) {
      setFilteredCountries([]);
      setMessage('Countries to display is greater than 10.');
      return;
    } else {
      setMessage('');
      setFilteredCountries(filtered);
    }
  }, [country]);

  useEffect(() => {
    if (filteredCountries.length === 0 || filteredCountries.length > 1) {
      setWeather(null);
      return;
    }

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].name.common}&appid=${api_key}&units=metric` // Added units=metric to get temperature in Celsius
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => console.error('Error:', error));
  }, [filteredCountries]);

  return (
    <>
      <h1>Country Search</h1>
      <label>Find countries </label>
      <input
        type='text'
        placeholder='country'
        onChange={(e) => setCountry(e.target.value)}
      />
      {filteredCountries.map((item, index) => (
        <div key={index}>
          <p>{item.name.common}</p>
          {filteredCountries.length > 1 && (
            <button
              onClick={() => {
                setFilteredCountries([item]);
              }}>
              Select country
            </button>
          )}
          {filteredCountries.length === 1 && (
            <>
              <div>Capital: {item.capital[0]}</div>
              <div>Population: {item.population}</div>
              <div>Languages:</div>
              {Object.values(item.languages).map((value, index) => (
                <div key={index}>{value}</div>
              ))}
              <img src={item.flags.png} />
              {weather && (
                <>
                  <div>Weather in {item.name.common}:</div>
                  <div>Temperature: {weather.main.temp} celcius</div>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  />
                  <div>Wind: {weather.wind.speed} m/s</div>
                </>
              )}
            </>
          )}
        </div>
      ))}
      {message && <div>{message}</div>}
    </>
  );
}

export default App;
