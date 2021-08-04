const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL
const dbConnect = () => {
    mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
    console.log(`Connection to ${db.name} successful`)
});
}

module.exports = dbConnect