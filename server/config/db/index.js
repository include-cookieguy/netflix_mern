const mongoose = require('mongoose');

//Connect to database
async function connect() {
  try {
    await mongoose.connect('mongodb+srv://root:stickypass@cluster0.gtu8l.mongodb.net/netflix_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (e) {
    console.log('Fail to connect to MongoDB');
  }
}

module.exports = { connect };
