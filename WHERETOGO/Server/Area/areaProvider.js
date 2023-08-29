import pool from "../config/database.js";
import logger from "../config/winston.js";

import * as areaDao from "./areaDao.js";

export async function getBigContent (areacode) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getBigContentResult = await areaDao.getBigContentRow(connection, areacode);
    connection.release();
  
    return getBigContentResult[0];
  };

export async function getSmallContent (bigarea, smallarea) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getSmallContentResult = await areaDao.getSmallContentRow(connection, bigarea, smallarea);
    connection.release();
  
    return getSmallContentResult[0];
  };

  export async function getListContent () {
    const connection = await pool.getConnection(async (conn) => conn);
    const getListContentResult = await areaDao.getListContentRow(connection);
    connection.release();
  
    return getListContentResult;
  };

  export async function getDListContent (areacode) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getListContentResult = await areaDao.getDListContentRow(connection,areacode);
    connection.release();
  
    return getListContentResult;
  };