import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ item }) => {
  return (
    <>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          {item.map((country) => {
            return (
              <div
                className='col-md-3 col-sm-6 card my-3 me-0 p-2 border-0'
                key={country.name.common}
              >
                <div className='card-img-top'>
                  <img src={country.flags.png} alt={country.name.commmon} className='photo w-75' />
                </div>
                <div className='card-body'>
                  <div className='card-title fw-bold fs-4'>
                    <Link to={`/countries/${country.ccn3}`}>{country.name.common}</Link>
                  </div>
                  <div className='card-text'><label className='me-1'><strong>Population: </strong></label>{Number(country.population).toLocaleString()}</div>
                  <div className='card-text'><label className='me-1'><strong>Region: </strong></label>{country.region}</div>
                  <div className='card-text'><label className='me-1'><strong>Capital: </strong></label>{country.capital}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Cards;
