const cassandra = require('cassandra-driver');

const benchmarkSingleQuery = () => {
  const time = { startConn: process.hrtime.bigint() };
  const conn = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    keyspace: 'sdc',
  });

  time.startSelect = process.hrtime.bigint();
  conn
    .execute(`SELECT count(*) FROM myTable WHERE listingId = ${9600000}`)
    .then(() => {
      time.endSelect = process.hrtime.bigint();
      time.startInsert = process.hrtime.bigint();
      return conn.execute(
        "INSERT INTO myTable (id, listingId, alt, photoId, title) VALUES (99999999, 10000000, 'test alt', 101, 'test title');",
      );
    })
    .then(() => {
      time.endInsert = process.hrtime.bigint();
      time.startUpdate = process.hrtime.bigint();
      return conn
        .execute(
          "UPDATE myTable SET alt = 'test' WHERE id = 99999999 AND listingId = 10000000",
        )
        .then(() => {
          time.endUpdate = process.hrtime.bigint();
          time.startDelete = process.hrtime.bigint();
          return conn.execute(
            'DELETE FROM myTable WHERE id = 99999999 AND listingId = 10000000',
          );
        })
        .then(() => {
          time.endDelete = process.hrtime.bigint();
          time.endConn = process.hrtime.bigint();
        })
        .then(() => {
          conn.shutdown();
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
};
benchmarkSingleQuery();
