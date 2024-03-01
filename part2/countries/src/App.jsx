import { useState, useEffect } from 'react'
import countryServices from './services/countries'

const Search = ({newSearch, handleNewSearch}) => {
  return (
    <form>
      find countries <input value={newSearch} onChange={handleNewSearch}/>
    </form>
  )
}

const Countries = ({countries, handleShow}) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  else if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => {
          return (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={handleShow(country.name.common)}>show</button>
            </div>
          )
        })}
      </div>
    )
  }
  else if (countries.length === 1) {
    return <CountryInfo country={countries[0]}/>
  }
}

const CountryInfo = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages</h3>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.name.common} width="150"/>
    </div>
  )
}

function App() {
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const handleShow = (name) => () => {
    setNewSearch(name)
  }

  useEffect(() => {
    countryServices
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])
  const countriesToShow = newSearch === ''
    ? ''
    : countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))
  return (
    <div>
      <Search newSearch={newSearch} handleNewSearch={handleNewSearch}/>
      <Countries countries={countriesToShow} handleShow={handleShow}/>
    </div>
  )
}

export default App
