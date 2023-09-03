import pool from "../config/database.js";
import logger from "../config/winston.js";

import * as calendarDao from "./calendarDao.js";

export async function getSavedList(uid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await calendarDao.getSavedEventRow(connection, uid);
    connection.release();
  
    return getResult;
};