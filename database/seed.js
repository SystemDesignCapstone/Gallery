const mongoose = require('mongoose');
const Listing = require('./Listing.js');
const aws = require('aws-sdk');
const faker = require('faker');

let s3 = new aws.S3();

let data = {
  Bucket: 'airjld-photos'
}

s3.listObjects(data, (err, info) => {
  if (err) {
    console.log('Error!!!')
  } else {
    let baseURL = 'https://s3-us-west-1.amazonaws.com/airjld-photos/';
    for (var x = 1; x < 100; x++) {
      let sampleListing = {};
      sampleListing.title = faker.lorem.sentence();
      sampleListing.photoId = x;
      sampleListing.id = Math.floor(Math.random() * 100) + 1;
      sampleListing.urls = baseURL + info.Contents[x].Key;
      sampleListing.alt = faker.lorem.sentence();
      Listing.create(sampleListing).then(() => mongoose.disconnect());
    }
  }     
});

// const insertListings = () => {
//   Listing.create(listingSample)
//     .then(() => mongoose.disconnect());
// };

// insertListings();
