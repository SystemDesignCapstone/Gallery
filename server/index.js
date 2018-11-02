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

const port = 1128;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
