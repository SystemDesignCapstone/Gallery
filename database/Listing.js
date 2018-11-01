const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

const listingSchema = new mongoose.Schema({
  title: String,
  urls: [
    {
      url: String,
      alt: String,
    },
    {
      url: String,
      alt: String,
    },
    {
      url: String,
      alt: String,
    },
    {
      url: String,
      alt: String,
    },
    {
      url: String,
      alt: String,
    },
    {
      url: String,
      alt: String,
    },
    {
      url: String,
      alt: String,
    },
    {
      url: String,
      alt: String,
    },
  ],
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
