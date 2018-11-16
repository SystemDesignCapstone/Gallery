const mongoose = require('mongoose');
const db = require('./index.js');

const Listing = {};
const url = number =>
  `https://s3-us-west-2.amazonaws.com/sdc-trailblazer-gallery/img${number}.jpg`;
let i = 101;

const pictures = [
  {
    alt: 'Eos aut et qui ut corporis voluptas.',
    title: 'Deserunt culpa dignissimos voluptatem perspiciatis.',
    urls: url(i++),
  },
  {
    alt: 'Eos aut et qui ut corporis voluptas.',
    title: 'Deserunt culpa dignissimos voluptatem perspiciatis.',
    urls: url(i++),
  },
  {
    alt: 'Eos aut et qui ut corporis voluptas.',
    title: 'Deserunt culpa dignissimos voluptatem perspiciatis.',
    urls: url(i++),
  },
  {
    alt: 'Eos aut et qui ut corporis voluptas.',
    title: 'Deserunt culpa dignissimos voluptatem perspiciatis.',
    urls: url(i++),
  },
  {
    alt: 'Eos aut et qui ut corporis voluptas.',
    title: 'Deserunt culpa dignissimos voluptatem perspiciatis.',
    urls: url(i++),
  },
  {
    alt: 'Eos aut et qui ut corporis voluptas.',
    title: 'Deserunt culpa dignissimos voluptatem perspiciatis.',
    urls: url(i++),
  },
  {
    alt: 'Eos aut et qui ut corporis voluptas.',
    title: 'Deserunt culpa dignissimos voluptatem perspiciatis.',
    urls: url(i++),
  },
  {
    alt: 'Eos aut et qui ut corporis voluptas.',
    title: 'Deserunt culpa dignissimos voluptatem perspiciatis.',
    urls: url(i++),
  },
];

Listing.find = cb => {
  cb(null, pictures);
};

module.exports = Listing;
