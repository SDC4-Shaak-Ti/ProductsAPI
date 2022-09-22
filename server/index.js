require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const {getOneProduct, getRelatedProducts, getStyles} = require('../database/index.js');

//middleware
// app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

//routes

//get related products
app.get('/products/*/related', (req, res) => {
  getRelatedProducts(req.params['0'])
  .then((relatedProducts) => {
    res.send(relatedProducts);
  })
  .catch((err) => {
    console.log(err);
  })
});

//get all features for a product

app.get('/products/*/styles', (req, res) => {
  getStyles(req.params['0'])
  .then((productStyles) => {
    res.send(productStyles);
  })
  .catch((err) => {
    console.log(err);
  });
});

//get all product info for one product

app.get('/products/*', (req, res) => {
  getOneProduct(req.params['0'])
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      console.log(err);
    })
});

// app.get('/')

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});