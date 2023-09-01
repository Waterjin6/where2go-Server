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
  
    return getResult;
};

export async function getEventUserInfo(eid, uid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResultV = await eventDao.getEventUserVisitedInfoRow(connection, eid,uid);
    const getResultS = await eventDao.getEventUserSavedInfoRow(connection, eid,uid);
    connection.release();

    var isVisited = false, isSaved = false;

    if(getResultV[0].visitedNum >= 1)isVisited = true;
    if(getResultS[0].savedNum >= 1)isSaved = true;

    return {"isVisited" : isVisited, "isSaved" : isSaved};
};
