import pool from "../config/database.js";
import logger from "../config/winston.js";

const visitedDao = "./visitedDao.js";

exports.getVisitedEvent = async function (uid) {

      const connection = await pool.getConnection(async (conn) => conn);
      const visitedListResult = await visitedDao.selectVisitedEvent(connection, uid);
      connection.release();
  
      return visitedListResult;
  };
