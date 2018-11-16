const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Listing = require('../database/Listing.js');

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

app.get('/listings', (req, res) => {
  Listing.find((err, listing) => {
    if (err) {
      console.log('hey, there was an error on master listing');
      throw err;
    } else {
      return res.send(listing);
    }
  });
});

app.get('/listings/:id', (req, res) => {
  Listing.find({ id: req.params.id }, (err, listing) => {
    if (err) {
      console.log('hey, there was an error on id');
      throw err;
    } else {
      console.log('this is the listing', listing);
      return res.send(listing);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
