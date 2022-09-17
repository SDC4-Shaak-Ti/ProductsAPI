const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const {Pool} = require('pg');

const pool = new Pool({
host: process.env.HOST,
user: process.env.USERNAME,
database: process.env.DATABASE,
password: process.env.PASSWORD,
port: process.env.DATABASE_PORT,
});

//get all info for one product
const getOneProduct = (product_id) => {
  return pool
    .connect()
    .then(client => {
      return client.query(`SELECT * FROM all_products WHERE id = ${product_id};`)
      .then(results => {
        client.release();
        return results.rows[0]
      })
      .catch(err => {
        client.release();
        console.log(err);
      })
    })
    .finally(() => {
      pool.end();
    });
}
// getOneProduct(1);

//get related products for a product
const getRelatedProducts = (product_id) => {
  return pool
  .connect()
  .then(client => {
    // console.log(product_id)
    return client.query(`SELECT json_agg(related_product_id) FROM related WHERE current_product_id = ${product_id};`)
    .then(results => {
      client.release();
      return results.rows[0].json_agg;
    })
    .catch(err => {
      client.release();
      console.log(err);
    })
  });
}
// getRelatedProducts(1);

// get all styles for one product

const getStyles = (product_id) => {
  return pool
    .connect()
    .then(client => {
      return client.query(`select json_build_object(
        'id', ap.id,
        'name', ap.name,
        'slogan', ap.slogan,
        'description', ap.description,
        'category', ap.category,
        'default_price', ap.default_price,
        'features', (
          select json_agg(json_build_object(
            'feature', fe.feature,
            'value', fe.value
          ))
          from features fe where fe.product_id = ap.id
        )
      ) as result
      from all_products ap
      where ap.id = ${product_id};`)
      .then(results => {
        client.release();
        return results.rows[0];
      })
      .catch(err => {
        client.release();
        console.log(err);
      })
    });
}
// getStyles(1);

module.exports = {
  getOneProduct:  getOneProduct,
  getRelatedProducts:  getRelatedProducts,
  getStyles:  getStyles
};