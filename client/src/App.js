import React from 'react';
import Home from './Home';
import Detail from './Detail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <nav className='navbar bg-light'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>Where in the world?</a>
          <div className='d-flex'>
            <a className='link-dark' href='/'>Dark Mode</a>
          </div>
        </div>
      </nav>
      <Router>
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/countries' element={ <Home/> } />
          <Route path='/countries/:countryId' element={ <Detail /> } />
        </Routes>
      </Router>
    </>
  );
};

export default App;
