import { useEffect, useState } from 'react'
import countriesService from './services/countries'

import './App.css'
import SearchBar from './components/SearchBar'
import CountryList from './components/CountryList'
import Display from './components/Display'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [displayingCountries, setDisplayingCountries] = useState([])

  useEffect(() => {
    countriesService.getAll().then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  useEffect(() => {
    if (!countries) {
      return
    }

    if (countryFilter.trim() === '') {
      setDisplayingCountries([])
      return
    }

    const filteredCountries = countries.filter(country => country.name.common.indexOf(countryFilter) !== -1)
    setDisplayingCountries(filteredCountries) 
  }, [countryFilter, countries])

  if (countries === null) {
    return (
      <>
        <Display message={'Waiting for response...'} />
      </>
    )
  }

  let displayingComponent
  if (displayingCountries.length > 10) {
    displayingComponent = <Display message={'Too many matches, specify another filter'} />
  } else if (displayingCountries.length > 1) {
    displayingComponent = <CountryList countries={displayingCountries} displayCountry={(c) => { setDisplayingCountries([c]) } } />
  } else if (displayingCountries.length === 1) { 
    const selectedCountry = displayingCountries[0]
    displayingComponent = <CountryInfo country={selectedCountry} /> 
  } else if (countryFilter.trim() !== '') {
    displayingComponent = <Display message={'Could not find country! Try another filter'} />
  }

  return (
    <>
      <SearchBar countryFilter={countryFilter} onTextUpdated={(e) => setCountryFilter(e.target.value)}/>
      {displayingComponent}
    </>
  )
}

export default App
