const mariadb = require('mariadb');
const Lynx = require('lynx');
const fs = require('fs');
const zlib = require('zlib');

const metrics = new Lynx('localhost', 8125);
const Listing = {};
let start = 1;
const target = 10000000;

mariadb
  .createConnection({
    socketPath: '/run/mysqld/mysqld.sock',
    database: 'sdc',
    user: 'root',
  })
  .then(conn => {
    Listing.find = data => {
      const pictures = [];

      conn
        .queryStream(`SELECT * FROM myTable WHERE listingId = ${data.id}`)
        .on('error', err => {
          metrics.increment('gallery.errors');
          console.log(err);
        })
        .on('data', row => {
          const { id, alt, photoId, title } = row;
          pictures.push({
            id,
            alt,
            title,
            photoId,
          });
        })
        .on('end', () => {
          zlib.gzip(JSON.stringify(pictures), (err, res) => {
            fs.writeFileSync(`s3Data/${data.id}`, res, 'utf8');
          });
          if (++start <= target) {
            if (start % 100000 === 0) {
              console.log('done with: ', start);
            }
            Listing.find({ id: start });
          }
        });
    };
    Listing.find({ id: start });
  });
