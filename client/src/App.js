import './App.css';

function App() {
  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="MovieName" />
        <label>Movie Review:</label>
        <input type="text" name="MovieReview" />

        <button>Submit</button>
      </div>
    </div>
  );
}

export default App;
