require('dotenv').config();
const express = require('express');
const mysql = require('mysql');

const app = express();

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
  // Column Entries to be added.
  const movieEntry = { movieName: 'inception', movieReview: 'Good movie' };
  // SQL statement to execute.
  const sqlInsert = 'INSERT INTO movie_reviews SET ?';
  // Query the database and add the above statement and entries. Throw an error if one is present.
  db.query(sqlInsert, movieEntry, (err, result) => {
    if (err) throw err.message;
    console.log(result);
    res.send('Movie Entry Added...');
  });
});

app.listen(process.env.API_PORT, () => {
  console.log(
    '\x1b[35m',
    `Server running at: http://localhost:${process.env.API_PORT}/`,
    '\x1b[37m'
  );
});
