import { useState, useEffect } from 'react'
import axios from "axios"

const api_key = import.meta.env.VITE_API

const CountryInfo = ({ countryName }) => {
  console.log(countryName)
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
      .then(response => {
        setCountry(response.data)

        return (
          axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${response.data.capital},${response.data.altSpellings[0]}&appid=${api_key}`)
        )
      })
      .then(response => response.data)
      .then(data => {
        console.log(data)
        setWeather({
          temp: `${data.main.temp - 273.15}`,
          wind: `${data.wind.speed}`,
          iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        })
      })
  }, [countryName])
  
  if (country === null || weather === null) {
    return null
  }
  
  const languages = Object.values(country.languages)
  const flag = Object.values(country.flags)[1]

  return (
    <div>
      <h1>{country.name.common}</h1>
      Capital: {country.capital}
      <br/>
      Area: {country.area}
      <h1>Languages</h1>
      <ul>
        {languages.map(language => 
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={flag} width="20%"/>
      <h1>Weather in {country.capital}</h1>
      Temperature: {weather["temp"].slice(0, 5)} Celcius
      <br/>
      <img src={weather["iconUrl"]} />
      <br/>
      Wind: {weather["wind"]} m/s
    </div>
  )
}

const Countries = ({ countries, setCountries }) => {
  console.log(countries)
  if(countries.length === 0) {
    return null
  } else if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length<= 10 & countries.length > 1) {
    return (
      <ul>
        {countries.map(country => 
          <li key={country.name.common}>{country.name.common}<button onClick={() => setCountries([country])}>Show</button></li>
        )}
      </ul>
    )
  }

  const countryName = countries[0].name.common

  return (
    <>
      <CountryInfo countryName={countryName} />
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])

  const updateCountries = (event) => {
    const search = event.target.value
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then(response => response.data)
        .then(countries => countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())))
        .then(searchResults => setCountries(searchResults))
  }

  return (
    <>
      <label>Find Countries:</label>
      <input type='text' onChange={updateCountries}></input>
      <Countries countries={countries} setCountries={setCountries} />
    </>
  )
}

export default App
