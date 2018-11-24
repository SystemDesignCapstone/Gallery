const { Readable } = require('stream');
const faker = require('faker');

const updateData = ({ listingId, id, photoNumber }) => {
  const output = {
    listingId,
    photoNumber: photoNumber + 1,
    id: id + 1,
    maxPhotoNumber: Math.floor(Math.random() * 35) + 3,
    photoId: Math.floor(Math.random() * 600) + 1,
    title: faker.lorem.sentence(),
    alt: faker.lorem.sentence(),
  };

  if (output.photoNumber > output.maxPhotoNumber) {
    output.listingId += 1;
    output.photoNumber = 0;
  }

  return output;
};

let currentData = { listingId: 1, id: 0, photoNumber: 0 };

const inStream = new Readable({
  read() {
    let chunk = '';
    for (let i = 0; i < 4; i++) {
      currentData = updateData(currentData);
      const { listingId, id, alt, photoId, title } = currentData;
      chunk += `${listingId}\t${id}\t${alt}\t${photoId}\t${title}\n`;
    }
    currentData.listingId <= 1e7 ? this.push(chunk) : this.push(null);
  },
});
inStream.pipe(process.stdout);
