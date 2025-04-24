import { useState,useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

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
    const fetchCountries = async () => {
      try {
        const url = `https://restcountries.com/v3.1/name/${filter}`
        const response = await axios.get(url)
        setCountries(response.data)
      }
      catch (error) {
        console.error("Error fetching countries:", error)
      }
    }
    fetchCountries()
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
    </div>
  )
}
export default App
