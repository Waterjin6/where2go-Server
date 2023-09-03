import pool from "../config/database.js";
import logger from "../config/winston.js";

import * as savedDao from "./savedDao.js";

export async function getSavedList(uid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await savedDao.getSavedEventRow(connection, uid);
    connection.release();
  
    return getResult;
};


export async function checkSavedList(uid, eid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await savedDao.checkSavedEventRow(connection, uid, eid);
    connection.release();
  
    return getResult[0].isSaved;
};