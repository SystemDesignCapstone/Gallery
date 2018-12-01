const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Lynx = require('lynx');
// const request = require('request');

const metrics = new Lynx('localhost', 8125);

// let pastRequests = 0;
// setInterval(() => {
//   request('http://localhost:3006/nginx_status', (err, res, body) => {
//     const cumulativeRequests = body.split('\n')[2].split(' ')[3];
//     const newRequests =
//       cumulativeRequests - (pastRequests || cumulativeRequests);
//     pastRequests = cumulativeRequests;
//     metrics.send({ 'gallery.nginxResponse': `${newRequests}|c` });
//   });
// }, 100);
const app = express();
const port = process.env.PORT || 1128;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(express.static(path.join(__dirname, '../assets')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/test', (req, res) => {
  res.send('Hey guys!');
});

app.post('/listing/:id', (req, res) => {
  res.send(`New entry added to listing ${req.params.id}(just kidding!)`);
  metrics.increment('gallery.post');
});

app.put('/listing/:id', (req, res) => {
  res.send(`Entry in listing ${req.params.id} updated (just kidding!)`);
});

app.delete('/listing/:id', (req, res) => {
  res.send(`Entry in listing ${req.params.id} deleted (just kidding)`);
});

app.post('/listings/:id', (req, res) => {
  console.log('POST to /listings/:id');
  res.send('quit poking me!');
});
// app.get('/listings', (req, res) => {
//   Listing.find((err, listing) => {
//     if (err) {
//       console.log('hey, there was an error on master listing');
//       throw err;
//     } else {
//       return res.send(listing);
//     }
//   });
// });

// app.get('/listings/:id', (req, res) => {
//   // return res.send('hello, world');
//   const timer = metrics.createTimer('gallery.responseTime');
//   Listing.find({ id: req.params.id }, (err, listing) => {
//     if (err) {
//       console.log('hey, there was an error on id');
//       throw err;
//     } else {
//       metrics.increment('gallery.response');
//       timer.stop();
//       return res.send(listing);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
