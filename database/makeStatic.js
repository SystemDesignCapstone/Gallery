const cassandra = require('cassandra-driver');
const fs = require('fs');
const zlib = require('zlib');

const Listing = {};
let start = 1;
const target = 1000;

const conn = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  keyspace: 'sdc',
});
Listing.find = data => {
  const pictures = [];

  conn
    .execute(`SELECT * FROM myTable WHERE listingId = ${data.id}`)
    .then(result => {
      result.rows.forEach(row => {
        const { id, alt, photoid, title } = row;
        pictures.push({
          id,
          alt,
          title,
          photoid,
        });
      });
      zlib.gzip(JSON.stringify(pictures), (err, res) => {
        fs.writeFileSync(`s3Data/${data.id}`, res, 'utf8');
      });
      if (++start <= target) {
        if (start % 100 === 0) {
          console.log('done with: ', start);
        }
        Listing.find({ id: start });
      }
    });
};
Listing.find({ id: start });
