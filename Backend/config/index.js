const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });
module.exports = {
  db_uri: process.env.DB_URI,
  port: process.env.PORT || 3000,
  mode: process.env.NODE_ENV || 'development',
  jwt_secret: process.env.JWT_SECRET || 'abuzar123',
  jwt_expiration: process.env.JWT_EXPIRATION || '90d',
};