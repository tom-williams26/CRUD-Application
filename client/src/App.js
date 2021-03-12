import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  // React hook allows to use react features - Adds a react state, useful when using states (hooks are useful and classes don't need to be written).
  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);

  const [newReview, setNewReview] = useState('');
  // useEffect() basically means 'do something after render'.
  useEffect(() => {
    Axios.get('http://localhost:5000/api/get/').then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post('http://localhost:5000/api/insert/', {
      movieName: movieName,
      movieReview: movieReview,
    });

    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: movieReview },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:5000/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put('http://localhost:5000/api/update/', {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview('');
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
            <div className="card">
              <h2>{val.movieName}</h2>
              <p>{val.movieReview}</p>

              <button
                onClick={() => {
                  deleteReview(val.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
