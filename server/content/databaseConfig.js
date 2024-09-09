import pg from "pg";
import mysql2 from "mysql2";
import "dotenv/config";

const mysqlDB = mysql2.createConnection({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_CONFIG_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  port: process.env.MYSQL__CONFIG_PORT,
});

// const pgDB = new pg.Client({
//   database: process.env.DB_DATABASE,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_HOST,
//   port: process.env.DB_PORT,
// });

mysqlDB.connect((err) => {
  if (err) return console.log("error", err);
  console.log("MySql DB is working!");
});


// pgDB.connect((err) => {
//   if (err) return console.log("error", err);
//   console.log("postgreSQL is working!");
// });

export { mysqlDB };
