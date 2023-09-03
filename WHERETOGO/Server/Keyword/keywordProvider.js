import pool from "../config/database.js";
import logger from "../config/winston.js";

import * as keywordDao from "./keywordDao.js";

export async function getKeywordList(uid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await keywordDao.getKeywordRow(connection, uid);
    connection.release();
  
    return getResult;
};


export async function checkKeywordExist(uid, keyword) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await keywordDao.checkKeywordExistRow(connection, uid, keyword);
    connection.release();
  
    return getResult[0].isExist;
};