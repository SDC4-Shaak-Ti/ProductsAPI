// import http from 'k6/http';
// import { check, sleep } from 'k6';

// export const options = {
//   stages: [
//     { duration: '1s', target: 1000 },
//   ]
// }

// export default () =>{
//   // const relatedProducts = http.get('http://localhost:3000/products/1000000/related');
//   // const product = http.get('http://localhost:3000/products/1000000');
//   const productStyle = http.get('http://localhost:3000/products/1000000/styles');
//   // check(relatedProducts, { 'status was 200': r => r.status === 200 });
//   // sleep(1);
//   // check(product, { 'status was 200': r => r.status === 200 });
//   // sleep(1);
//   check(productStyle, { 'status was 200': r => r.status === 200 });

//   sleep(1);
// }





// // import http from 'k6/http';
// // import { check, sleep } from 'k6';
// // import { Rate } from 'k6/metrics';

// // export const options = {
// //   discardResponseBodies: true,
// //   scenarios: {
// //     contacts: {
// //       executor: 'constant-vus',
// //       vus:200,
// //       duration: '100s',
// //       gracefulStop: '0s',
// //     },
// //   },
// // };

// // export const errorRate = new Rate('errors');

// // export default function () {
// //   const productId = 1;
// //   const url = `http://localhost:3000/products/${productId}/related`;
// //   check(http.get(url), {
// //     'status is 200': (r) => r.status == 200,
// //   }) || errorRate.add(1);
// //   sleep(1);
// // }
