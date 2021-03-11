require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }

  if (connection) connection.release();
});

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/api/get', (req, res) => {
  // SQL statement to execute.
  const sqlSelect = 'SELECT * FROM movie_reviews';
  // Query the database and add the above statement and entries. Throw an error if one is present.
  db.query(sqlSelect, (err, result) => {
    if (err) throw err.message;
    res.send(result);

    console.log(result);
  });
});
app.post('/api/insert', (req, res) => {
  const { movieName, movieReview } = req.body;
  // SQL statement to execute.
  const sqlInsert =
    'INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)';
  // Query the database and add the above statement and entries. Throw an error if one is present.
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    if (err) throw err.message;
    res.send('Movie Entry Added...');
    console.log(result);
  });
});

app.listen(process.env.API_PORT, () => {
  console.log(
    '\x1b[35m',
    `Server running at: http://localhost:${process.env.API_PORT}/`,
    '\x1b[37m'
  );
});
