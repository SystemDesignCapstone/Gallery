const mariadb = require('mariadb');

console.log('Connecting to db…');
const insert = name => {
  mariadb
    .createConnection({
      socketPath: '/run/mysqld/mysqld.sock',
      database: 'sdc',
      user: 'root',
    })
    .then(conn => {
      console.log(`connected ! connection id is ${conn.threadId}`);
      for (let i = 0; i < 100000; i++) {
        conn
          .queryStream(
            `INSERT INTO myTable ( test, name ) VALUES ( 1, '${name}');`,
          )
          .on('error', err => console.log(err))
          .on('fields', meta => console.log(meta))
          .on('data', row => console.log(row))
          .on('end', () => {});
      }
      console.log('done');
    })
    .catch(err => console.log(`not connected due to error: ${err}`));
};

for (let i = 0; i < 20; i++) {
  insert(String(i));
}
