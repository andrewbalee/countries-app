import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom'

const Detail = () => {
  const [country, setCountry] = useState();
  const {countryId} = useParams()

  React.useEffect(() => {
    fetch('/api?id=' + countryId)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data[0]);
      });
  }, [countryId]);

  if (country) {
    return (
      <>
        <div className='row p-4'>
          <div className='col-sm-2'>
            <a className='btn btn-outline-dark' href='/countries' role='button'>Back</a>
          </div>
        </div>
        <div className='row p-4'>
          <div className='col-sm-6'>
            <img src={country.flags.png} alt={country.name.commmon} className='photo w-75' />
          </div>
          <div className='row col-sm-6'>
            <div className='col-sm-6'>
              <div><label className='me-1'><strong>Native Name: </strong></label>{Object.values(country.name.nativeName)[0].common}</div>
              <div><label className='me-1'><strong>Population: </strong></label>{Number(country.population).toLocaleString()}</div>
              <div><label className='me-1'><strong>Region: </strong></label>{country.region}</div>
              <div><label className='me-1'><strong>Sub Region: </strong></label>{country.subregion}</div>
              <div><label className='me-1'><strong>Capital: </strong></label>{country.capital[0]}</div>
            </div>
            <div className='col-sm-6'>
                <div><label className='me-1'><strong>Top Level Domain: </strong></label>{country.tld[0]}</div>
                <div><label className='me-1'><strong>Currencies: </strong></label>{Object.keys(country.currencies).join(', ')}</div>
                <div><label className='me-1'><strong>Languages: </strong></label>{Object.values(country.languages).join(', ')}</div>
            </div>
            { country.borders ? 
                <div className='col-sm-12'>
                <label className='me-1'><strong>Border Countries: </strong></label>
                {country.borders.map((border) => <Link to={`/countries/${border}`} className='badge bg-secondary me-1' key={border}>{border}</Link>)}
              </div>
              :
              <></>
            }
          </div>
        </div>
      </>
    );
  }
};

export default Detail;
