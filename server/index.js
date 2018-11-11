const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Listing = require('../database/Listing.js');

const app = express();
const port = process.env.PORT || 1128;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/listings', (req, res) => {
  Listing.find((err, listing) => {
    if (err) {
      console.log('hey, there was an error on master listing')
      throw err;
    } else {
      console.log('hey, this was a success on master listing')
      return res.send(listing);
    }
  });
});

app.get('/listings/:id', (req, res) => {
  Listing.find({photoId: req.params.id}, (err, listing) => {
    if (err) {
      console.log('hey, there was an error on id')
      throw err;
    } else {
      console.log('hey, this was a successful connection')
      return res.send(listing)
    }
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

