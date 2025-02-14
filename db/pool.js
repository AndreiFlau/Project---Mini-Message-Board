const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
  connectionString: process.env.DATABASE_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});
