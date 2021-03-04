require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(process.env.API_PORT, () => {
  console.log(
    '\x1b[35m',
    `Server running at: http://localhost:${process.env.API_PORT}/`,
    '\x1b[37m'
  );
});
