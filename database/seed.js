const mongoose = require('mongoose');
const Listing = require('./Listing.js');


const listingSample = [{
  title: 'Malibu House',
  id: 1,
  urls: [
    {
      url: 'https://s3-us-west-1.amazonaws.com/airjld-photos/174db9b0-52f1-4611-a49e-50c160b80534.jpg',
      alt: 'Little house in Paris, Loft, Canal',
    },
    {
      url: 'https://s3-us-west-1.amazonaws.com/airjld-photos/218c324c-4d5a-4755-a875-151ce1a618e3.jpg',
      alt: 'Sofa, armchairs & fire place area',
    },
    {
      url: 'https://s3-us-west-1.amazonaws.com/airjld-photos/2c51d2e6-27da-4fe2-a8a5-c1c314d35c9c.jpg',
      alt: 'View of entrance and kitchen big windows',
    },
    {
      url: 'https://s3-us-west-1.amazonaws.com/airjld-photos/9e718e6a_original.jpg',
      alt: 'Entrance with big windows, view on the living room, kitchen area on the right side',
    },
    {
      url: 'https://s3-us-west-1.amazonaws.com/airjld-photos/a59fa4ad-61b9-4f2c-8a25-9cb00de48ea9.jpg',
      alt: 'Kitchen with oven, washing machine, fridge… all equipment',
    },
    {
      url: 'https://s3-us-west-1.amazonaws.com/airjld-photos/c4b31160-955d-46aa-af66-7bfccf409c9b.jpg',
      alt: 'Entrance on a private alley',
    },
    {
      url: 'https://s3-us-west-1.amazonaws.com/airjld-photos/d8a726e9-5075-42cd-929a-d73181ddbedf.jpg',
      alt: 'Bridge over Canal Saint-Martin, 150 feet from Loft entrance',
    },
    {
      url: 'https://s3-us-west-1.amazonaws.com/airjld-photos/fe3c25bf-6419-4d6e-8425-29e8ed55aa4c.jpg',
      alt: 'View of the Canal Saint-Martin from our bridge',
    },
  ],
}];


// Unplash gives 50 api calls per hour
// 100 listings with 10 photos each
// Makes it 1000 photos
// Making it 20 hours of posts

const insertListings = () => {
  Listing.create(listingSample)
    .then(() => mongoose.disconnect());
};

insertListings();
