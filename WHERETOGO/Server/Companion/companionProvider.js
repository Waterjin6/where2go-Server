import pool from "../config/database.js";
import logger from "../config/winston.js";

import * as companionDao from "./companionDao.js";

export async function getList() {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await companionDao.getListRow(connection);
    connection.release();
  
    return getResult;
};