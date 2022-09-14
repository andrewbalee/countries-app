import React, { useState } from 'react';
import Cards from './Cards';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

let originalCountries = []
const Home = () => {
  const [countries, setCountries] = useState(originalCountries);

  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        originalCountries = data
        setCountries(data);
      });
  }, []);

  const menuItems = [...new Set(originalCountries.map((country) => country.region))];
  menuItems.sort()

  const filterCountry = (searchText) => {
    const filteredCountries = originalCountries.filter((country) => {
      return country.name.common.toLowerCase().startsWith(searchText.toLowerCase());
    });
    setCountries(filteredCountries);
  }

  const filterRegion = (region) => {
    const filteredCountries = originalCountries.filter((country) => {
      return country.region === region;
    });
    setCountries(filteredCountries);
  };
  
  return (
    <>
      <div className='container-fluid'>
          <div className='row justify-content-around mt-4 ms-3 me-4'>
              <div className='col-md-4 col-sm-12 mb-2'>
                  <input className='form-control form-control-lg' type='text' placeholder='Search for country...' aria-label='.form-control-lg example' onChange={event => filterCountry(event.target.value)} />
              </div>
              <div className='col-md-2 offset-md-6' >
                  <DropdownButton id='dropdown-basic-button' title='Filter by Region'>
                  <Dropdown.Item onClick={() => setCountries(originalCountries)}>All</Dropdown.Item>
                  {menuItems.map((region) => <Dropdown.Item onClick={() => filterRegion(region)} key={region}>{region}</Dropdown.Item>)}
                  </DropdownButton>
              </div>
          </div>
          <Cards item={countries} />
      </div>
    </>
  );
};

export default Home;
