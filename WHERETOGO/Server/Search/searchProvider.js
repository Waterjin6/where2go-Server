import pool from "../config/database.js";
import logger from "../config/winston.js";

import * as searchDao from "./searchDao.js";

export async function getHot() {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await searchDao.getHotWordsRow(connection);
    connection.release();
  
    return getResult;
};

export async function getSavedList(search, kind, fromD, toD, aCode, aDCode, free, align) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await searchDao.getSearchRow(connection, search, kind, fromD, toD, aCode, aDCode, free, align);
    connection.release();
  
    return getResult;
};