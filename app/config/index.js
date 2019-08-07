const config = require('./config')[process.env.NODE_ENV || 'development'];

config.sql = config;
module.exports = config;
