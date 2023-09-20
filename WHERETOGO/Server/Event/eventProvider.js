import pool from "../config/database.js";
import logger from "../config/winston.js";

import * as eventDao from "./eventDao.js";

export async function getMainBoardList() {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await eventDao.getMainBoardListRow(connection);
    connection.release();
  
    return getResult;
  };

export async function getTopList() {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await eventDao.getTopListRow(connection);
    connection.release();
  
    return getResult;
  };

export async function getRecommandEventsList(sex,age) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await eventDao.getRecommandEventsRow(connection, sex, age);
    connection.release();
  
    return getResult;
};

export async function getEventInfo(eid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await eventDao.getEventInfoRow(connection, eid);
    connection.release();
  
    return getResult[0];
};

export async function getEventExist(eid) {
  const connection = await pool.getConnection(async (conn) => conn);
  const getResult = await eventDao.getEventExistRow(connection, eid);
  connection.release();

  return getResult[0].isExist;
};


export async function getComPopList(cID) {
  const connection = await pool.getConnection(async (conn) => conn);
  const getResult = await eventDao.getComPopListRow(connection, cID);
  connection.release();

  return getResult;
};
