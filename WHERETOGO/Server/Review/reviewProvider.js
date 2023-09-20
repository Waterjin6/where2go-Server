import pool from "../config/database.js";
import logger from "../config/winston.js";

import * as reviewDao from "./reviewDao.js";

export async function checkReviewLike(uid, rid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await reviewDao.checkSavedEventRow(connection, uid, rid);
    connection.release();
  
    return getResult[0].isLiked;
};