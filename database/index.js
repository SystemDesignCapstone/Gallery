const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://airjld:asdfqwerzxcv1!@airjld-cluster-wa63e.mongodb.net/test?retryWrites=true'

const db = mongoose.connect(mongoUri, (err, client) => {
  if (err) { console.log(err, 'trouble connecting to DB'); }
  const collection = client.db("fec").collection("listings");
  console.log('success connecting to DB');
  client.close();
})

module.exports = db;
