import { useState,useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [weatherData, setWeatherData] = useState(null)

  const languagerender = (languages) => {
    if (typeof languages === "object" && languages !== null) {
      const values = Object.values(languages)
      return (
        <ul>
          {values.map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>
      )
    } else {
      return <p>Unknown</p>
    }
  }
  
  useEffect(() => {
    if (filter.trim() === "") {
      setCountries([])
      return
    }
    const fetchWeather = async () => {
      try {
        const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
        const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${filter}&aqi=no`
        const response = await axios.get(weatherApiUrl)
        setWeatherData(response.data)
      } catch (error) {
        console.error("Error fetching weather data:", error)
      }}
    const fetchCountries = async () => {
      try {
        const url = `https://restcountries.com/v3.1/name/${filter}`
        const response = await axios.get(url)
        setCountries(response.data)
      }
      catch (error) {
        console.error("Error fetching countries:",error)
      }
    }
    fetchCountries()
    fetchWeather()
  },[filter])

  return(
    <div>
      <h1>Country Info App </h1>
      <label>
        search for a country
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        ></input>
      </label>
        {countries.length > 10 && (
          <p>Too many matches, specify another filter</p>)}
        {countries.length <= 10 && countries.length > 1 && (
          <div>
            <h3>Matching Countries</h3>
            <ul>
              {countries.map((country) => (
                <li key={country.cca3}>{country.name.common}
                <button onClick={() => setFilter(country.name.common)}>show</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {countries.length === 1 && (
          <div>
            <h3>{countries[0].name.common}</h3>
            <p>Capital {countries[0].capital}</p>
            <p>Area {countries[0].area}</p>
            <h3>Languages </h3>
            {countries[0].languages && languagerender(countries[0].languages)}
          </div>
          )}
        {countries.length === 1 &&(
          <img src={countries[0].flags.png} alt="flag" />
        )}
        {weatherData && countries.length === 1 && (
          <div>
            <h3>Weather in {countries[0].capital}</h3>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <img src={weatherData.current.condition.icon} alt="weather icon" />
            <p>Wind Speed: {weatherData.current.wind_kph} k/h</p>
          </div>
        )}
        {countries.length === 0 && filter && (
          <p>No countries found for "{filter}"</p>
        )}

    </div>
  )
}
export default App
