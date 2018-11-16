const { Readable, Writable } = require('stream');
const mariadb = require('mariadb');
const faker = require('faker');

let db;
mariadb
  .createConnection({
    socketPath: '/run/mysqld/mysqld.sock',
    database: 'sdc',
    user: 'root',
  })
  .then(conn => {
    db = conn;
    db.query('SET autocommit=0');
    db.query('BEGIN');
    return conn.beginTransaction();
  })
  .then(() => {
    let x = 1;
    const inStream = new Readable({
      read() {
        if (x <= 1000000) {
          const title = faker.lorem.sentence();
          const listingId = x;
          const id = Math.floor(Math.random() * 100) + 1;
          const alt = faker.lorem.sentence();
          this.push(`${id}\t${listingId}\t${title}\t${alt}\n`);
          x++;
        } else {
          this.push(null);
        }
      },
    });

    const outStream = new Writable({
      write(chunk, encoding, callback) {
        db.queryStream(
          'INSERT INTO myTable (id, listingId, title, alt) VALUES (?, ?, ?, ?);',
          chunk.toString().split('\t'),
        )
          .on('error', err => console.log(err))
          .on('fields', meta => console.log(meta))
          .on('data', row => console.log(row))
          .on('end', () => {
            callback();
          });
      },
    });

    outStream.on('finish', function() {
      db.commit().then(() => {
        console.log('committed');
        db.query('END');
        db.end();
      });
    });
    return inStream.pipe(outStream);
  })
  .catch(err => console.log(`not connected due to error: ${err}`));
