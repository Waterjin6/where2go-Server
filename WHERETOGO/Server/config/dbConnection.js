import mysql from "mysql2";

// create the connection to database
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "where2goDB",
});

export default db;