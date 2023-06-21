require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const SECRET = process.env.SECRET

module.exports = {
  PORT,
  DATABASE_URL,
  SECRET
};
