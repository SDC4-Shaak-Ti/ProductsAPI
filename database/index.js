const path = require('path');
require('dotenv').config();
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
      // return client.query(`SELECT * FROM all_products WHERE id = ${product_id};`)
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
        'product_id', al.id,
        'results', (
          select json_agg(json_build_object(
            'style_id', st.id,
            'name', st.name,
            'original_price', st.original_price,
            'sale_price', st.sale_price,
            'default?', st.default_style,
            'photos', (
              select json_agg(json_build_object(
                'thumbnail_url', ph.thumbnail_url,
                'url', ph.url
                ))
                from photos ph where ph.styleid = st.id),
            'skus', (
              select json_object_agg(
                sk.id, (select json_build_object(
                  'quantity', sk.quantity,
                  'size', sk.size)
                  from skus where "id" = sk.id)
              )
                from skus as sk where "styleid" = st.id
                )
              ))
              as result from styles st
              where st.productid = al.id
              ))
              from all_products al
              where al.id = ${product_id};`)
      .then((results) => {
        client.release();
        return results.rows[0].json_build_object;
      })
      .catch((err) => {
        client.release();
        return err;
      });
  })
}

// getStyles(1);

module.exports = {
  getOneProduct:  getOneProduct,
  getRelatedProducts:  getRelatedProducts,
  getStyles:  getStyles
};