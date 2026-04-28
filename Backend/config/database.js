const mongoose = require('mongoose');
const  config = require ('./index');
  const connectDB = async () => {
    try {
      await mongoose.connect(config.db_uri);
      console.log('MongoDB connected successfully');
    } catch (error) {
     console.log('MongoDB connection failed', error);
      process.exit(1);
    }
  };
module.exports = connectDB;
