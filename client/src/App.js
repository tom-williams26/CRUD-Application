import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:5000/api/get/').then((response) => {
      // console.log(response.data);
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post('http://localhost:5000/api/insert/', {
      movieName: movieName,
      movieReview: movieReview,
    }).then(() => {
      alert('Successful insert...');
    });
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="MovieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Movie Review:</label>
        <input
          type="text"
          name="MovieReview"
          onChange={(e) => {
            setMovieReview(e.target.value);
          }}
        />

        <button onClick={submitReview}>Submit</button>
        {movieReviewList.map((val) => {
          return (
            <h5>
              Movie Name: {val.movieName} | Movie Review: {val.movieReview}
            </h5>
          );
        })}
      </div>
    </div>
  );
}

export default App;
