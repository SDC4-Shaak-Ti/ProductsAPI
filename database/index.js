require('dotenv').config();
const {Pool, Client} = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'products',
  password: 'password',
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((err) => {
    console.log(err);
  })

pool.query('SELECT * FROM all_products WHERE id < 20')
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    pool.end()
  });