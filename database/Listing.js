const mariadb = require('mariadb');
const Lynx = require('lynx');

const metrics = new Lynx('localhost', 8125);
const Listing = {};

mariadb
  .createConnection({
    socketPath: '/run/mysqld/mysqld.sock',
    database: 'sdc',
    user: 'root',
  })
  .then(conn => {
    Listing.find = (data, cb) => {
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
            urls: `https://s3-us-west-2.amazonaws.com/sdc-trailblazer-gallery/img${photoId}.jpg`,
          });
        })
        .on('end', () => {
          cb(null, pictures);
        });
    };
  });

module.exports = Listing;
