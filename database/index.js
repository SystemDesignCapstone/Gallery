const mongoose = require('mongoose');

const mongoUri = 'mongodb+srv://airjld:asdfqwerzxcv1!@airjld-cluster-wa63e.mongodb.net/test?retryWrites=true'

const db = mongoose.connect(mongoUri);

module.exports = db;
