import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './Movies.css';
import data from './Txttojson.json';
import { languagedata } from './Language';
import { countrydata } from './Country';
import { genredata } from './Genre';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row  from 'react-bootstrap/Row';

const MovieFilter = () => {
  const [language, setLanguage] = useState('-Select Language-');
  const [country, setCountry] = useState('-Select Country-');
  const [genre, setGenre] = useState('-Select Genre-');
  const [filteredMovies, setFilteredMovies] = useState(data);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    applyFilter(e.target.value, country, genre);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    applyFilter(language, e.target.value, genre);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    applyFilter(language, country, e.target.value);
  };

  const applyFilter = (selectedLanguage, selectedCountry, selectedGenre) => {
    let filteredData = [...data];

    if (selectedLanguage !== '-Select Language-') {
      filteredData = filteredData.filter(movie => movie.movielanguages.includes(selectedLanguage));
    }
    if (selectedCountry !== '-Select Country-') {
      filteredData = filteredData.filter(movie => movie.moviecountries.includes(selectedCountry));
    }
    if (selectedGenre !== '-Select Genre-') {
      filteredData = filteredData.filter(movie => movie.moviegenres.includes(selectedGenre));
    }

    setFilteredMovies(filteredData);
  };

  return (
    <div className='background'>
        <br/><br/>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridState">
      <Form.Select value={language} onChange={handleLanguageChange}>
        {languagedata.map(language => (
          <option key={language} value={language}>{language}</option>
        ))}
      </Form.Select>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridState">
      <Form.Select value={country} onChange={handleCountryChange}>
        {countrydata.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </Form.Select>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridState">
      <Form.Select value={genre} onChange={handleGenreChange}>
        {genredata.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </Form.Select>
      </Form.Group>
      </Row>


       
             <center>
          <br/><br/><br/><br/><br/>
      <div className='row'>
        {filteredMovies.map(movie => (
          <div key={movie.imdbmovieid} className='col-md-3'>
            <Card style={{ width: '12rem' }}>
              <Card.Img variant="top" src={movie.moviemainphotos[0]} />
              <Card.Body>
                <Card.Title>{movie.movietitle}</Card.Title>
              </Card.Body>
            </Card>
            <br />
          </div>
        ))}
      </div>
      </center>
    </div>
  );
};

export default MovieFilter;
