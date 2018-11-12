// const mongoose = require('mongoose');

// const mongoUri = 'mongodb://localhost/a-fec';

// const db = mongoose.connect(mongoUri);

// module.exports = db;


//////

const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://airjld:asdfqwerzxcv1!@airjld-cluster-wa63e.mongodb.net/a-fec?retryWrites=true'

const db = mongoose.connect(mongoUri, (err) => {
  if (err) { console.log(err, 'trouble connecting to DB'); }
  console.log('success connecting to DB');
})

module.exports = db;
