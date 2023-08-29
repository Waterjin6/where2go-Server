import pool from "../config/database.js";
import logger from "../config/winston.js";

import * as kindDao from "./kindDao.js";

export async function getKindName(kind) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await kindDao.getKindNameRow(connection, kind);
    connection.release();
  
    return getResult[0];
  };

  export async function getKindList() {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await kindDao.getKindListRow(connection);
    connection.release();
  
    return getResult;
  };