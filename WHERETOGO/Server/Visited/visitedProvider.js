import pool from "../config/database.js";
import logger from "../config/winston.js";

import * as visitedDao from "./visitedDao.js";

export async function getVisitedList(uid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.getVisitedEventRow(connection, uid);
    connection.release();
  
    return getResult;
};


export async function checkVisitedList(uid, eid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.checkVisitedEventRow(connection, uid, eid);
    connection.release();
  
    return getResult[0].isVisited;
};
