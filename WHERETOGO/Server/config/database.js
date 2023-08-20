import mysql from 'mysql2/promise';
import logger from './winston.js';

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    port : '3306',
    password: "MySQLsujin!",
    database: "where2goDB",
});

export default pool;