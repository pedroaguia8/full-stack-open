import { useState, useEffect } from 'react'
import './App.css'
import countryService from './services/countries'
import Filter from './components/Filter'
import Content from './components/Content'

function App() {
  const [countries, setCountries] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(nameFilter.toLowerCase())
  );


  useEffect(() => {
    countryService
      .getAll()
      .then(returnedCountries => {
        setCountries(returnedCountries);
      })
  }, []);

  return (
    <>
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <Content countries={countriesToShow} />
    </>
  )
}

export default App
