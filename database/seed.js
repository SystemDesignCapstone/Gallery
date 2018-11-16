const { Readable } = require('stream');
const faker = require('faker');

let listingId = 1;
let id = 1;
let photoNumber = 1;
let maxPhotoNumber = Math.floor(Math.random() * 7) + 3;

const inStream = new Readable({
  read() {
    if (listingId <= 10000000) {
      const title = faker.lorem.sentence();
      const alt = faker.lorem.sentence();
      const photoId = Math.floor(Math.random() * 600) + 1;

      this.push(`${listingId}\t${id}\t${alt}\t${photoId}\t${title}\n`);
      photoNumber++;
      if (photoNumber > maxPhotoNumber) {
        photoNumber = 0;
        maxPhotoNumber = Math.floor(Math.random() * 7) + 3;
        listingId++;
      }
      id++;
    } else {
      this.push(null);
    }
  },
});
inStream.pipe(process.stdout);
