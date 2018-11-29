const fs = require('fs');
const path = require('path');

const benchmarkSingleQuery = () => {
  const time = { startConn: process.hrtime.bigint() };
  time.startSelect = process.hrtime.bigint();
  console.log(
    fs.readFileSync(
      path.join(__dirname, '../data/listings/9600000.json'),
      'utf8',
    ),
  );

  time.endSelect = process.hrtime.bigint();
  time.startInsert = process.hrtime.bigint();
  const result = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '../data/listings/10000000.json'),
      'utf8',
    ),
  );
  console.log('RESULT: ', result);
  result.push({
    id: null,
    alt: 'test alt',
    photoId: 101,
    title: 'test title',
    listingId: '10000000',
  });

  fs.writeFileSync(
    path.join(__dirname, '../data/listings/10000000.json'),
    JSON.stringify(result),
    'utf8',
  );
  time.endInsert = process.hrtime.bigint();

  time.startUpdate = process.hrtime.bigint();
  //  return conn
  //    .query(`UPDATE myTable SET alt = 'test' WHERE id = ${res.insertId}`)
  //    .then(() => {
  //      time.endUpdate = process.hrtime.bigint();
  //      time.startDelete = process.hrtime.bigint();
  //      return conn.query(
  //        `DELETE FROM myTable WHERE id = ${res.insertId}`,
  //      );
  //    })
  //    .then(() => {
  //      time.endDelete = process.hrtime.bigint();
  //      conn.end();
  //    })
  //    .then(() => {
  time.endConn = process.hrtime.bigint();
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
  ---------------------------
  TOTAL:\t\t${Number(endConn - startConn) / 1e6}ms`,
  );
  // });
  // })
  // .catch(err => console.log(`not connected due to error: ${err}`));
  // });
};

benchmarkSingleQuery();

// console.info(
//   `connection:\t${Number(beginQuery - startConnection) / 1e6}ms
// query:\t\t${Number(endQuery - beginQuery) / 1e6}ms
// total:\t\t${Number(endQuery - startConnection) / 1e6}ms
// `,
// );
// console.info(`INSERT:\t${Number(endInsert - startInsert) / 1e6}ms`);
