const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/a-fec';

const db = mongoose.connect(mongoUri);

module.exports = db;
