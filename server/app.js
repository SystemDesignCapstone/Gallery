const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Listing = require('../database/Listing.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/listings', (req, res) => {
  Listing.find((err, listing) => {
    if (err) {
      throw err;
    } else {
      return res.send(listing);
    }
  });
});

app.get('/listings/:id', (req, res) => {
  Listing.find({photoId: req.params.id}, (err, listing) => {
    if (err) {
      throw err;
    } else {
      return res.send(listing)
    }
  })
})

module.exports = app