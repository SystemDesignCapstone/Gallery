const Lynx = require('lynx');
const mariadb = require('mariadb');

const metrics = new Lynx('localhost', 8125);
metrics.increment('meas.field');


const benchmarkSingleQuery = () => {
  const time = { startConn: process.hrtime.bigint() };
  mariadb
    .createConnection({
      socketPath: '/run/mysqld/mysqld.sock',
      database: 'sdc',
      user: 'root',
    })
    .then(conn => {
      time.startSelect = process.hrtime.bigint();
      conn
        .query(`SELECT count(*) FROM myTable WHERE listingId = ${9600000}`)
        .then(() => {
          time.endSelect = process.hrtime.bigint();
          time.startInsert = process.hrtime.bigint();
          return conn.query(
            "INSERT INTO myTable (listingId, alt, photoId, title) VALUES (10000000, 'test alt', 101, 'test title');",
          );
        })
        .then(res => {
          time.endInsert = process.hrtime.bigint();
          time.startUpdate = process.hrtime.bigint();
          return conn
            .query(`UPDATE myTable SET alt = 'test' WHERE id = ${res.insertId}`)
            .then(() => {
              time.endUpdate = process.hrtime.bigint();
              time.startDelete = process.hrtime.bigint();
              return conn.query(
                `DELETE FROM myTable WHERE id = ${res.insertId}`,
              );
            })
            .then(() => {
              time.endDelete = process.hrtime.bigint();
              time.endConn = process.hrtime.bigint();
              conn.end();
            })
            .then(() => {
              const {
                startConn,
                startSelect,
                endSelect,
                startInsert,
                endInsert,
                startUpdate,
                endUpdate,
                startDelete,
                endDelete,
                endConn,
              } = time;
              console.info(
                `connection:\t${Number(startSelect - startConn) / 1e6}ms
SELECT:\t\t${Number(endSelect - startSelect) / 1e6}ms
INSERT:\t\t${Number(endInsert - startInsert) / 1e6}ms
UPDATE:\t\t${Number(endUpdate - startUpdate) / 1e6}ms
DELETE:\t\t${Number(endDelete - startDelete) / 1e6}ms
---------------------------
TOTAL:\t\t${Number(endConn - startConn) / 1e6}ms`,
              );
            });
        })
        .catch(err => console.log(`not connected due to error: ${err}`));
    });
};

benchmarkSingleQuery();

// console.info(
//   `connection:\t${Number(beginQuery - startConnection) / 1e6}ms
// query:\t\t${Number(endQuery - beginQuery) / 1e6}ms
// total:\t\t${Number(endQuery - startConnection) / 1e6}ms
// `,
// );
// console.info(`INSERT:\t${Number(endInsert - startInsert) / 1e6}ms`);
