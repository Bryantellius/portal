import * as dotenv from 'dotenv';
import * as path from 'path';

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("Can't read .env file!");
}

export default {
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
  },
  port: parseInt(process.env.PORT, 10),
  secret_key: process.env.SECRET_KEY,
  lecturesDir: path.join(__dirname, "../src/server/lectures")
};