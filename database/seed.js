const { Readable } = require('stream');
const mariadb = require('mariadb');
const faker = require('faker');

const inStream = new Readable({
  read() {
    if (x <= 10000) {
      const title = faker.lorem.sentence();
      const listingId = x;
      const id = Math.floor(Math.random() * 100) + 1;
      const alt = faker.lorem.sentence();
      this.push(`${id}\t${listingId}\t${title}\t${alt}`);
    } else {
      this.push(null);
    }
  },
});

let x = 1;
const db = mariadb
  .createConnection({
    socketPath: '/run/mysqld/mysqld.sock',
    database: 'sdc',
    user: 'root',
  })
  .then(connection => {
    connection
      .beginTransaction()
      .then(() => {
        const insert = () => {
          const chunk = String(inStream.read());
          if (chunk !== 'null') {
            connection
              .query(
                'INSERT INTO myTable (id, listingId, title, alt) VALUES (?, ?, ?, ?)',
                String(chunk).split('\t'),
              )
              .then(() => {
                x++;
                insert();
              })
              .catch(err => console.log(err));
          } else {
          }
        };
        insert();
      })
      .then(() => {
        console.log('Committing…');
        connection.commit().then(() => connection.end());
      });
  });
