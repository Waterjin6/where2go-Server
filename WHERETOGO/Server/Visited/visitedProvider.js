import pool from "../config/database.js";
import logger from "../config/winston.js";

import * as visitedDao from "./visitedDao.js";

export async function getVisitedList(uid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.getVisitedEventRow(connection, uid);
    connection.release();
  
    return getResult;
};


export async function getAReview(vid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.getAReviewRow(connection, vid);
    connection.release();
  
    return getResult;
};

export async function checkVisitedList(uid, eid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.checkVisitedEventRow(connection, uid, eid);
    connection.release();
  
    return getResult[0].isVisited;
};

export async function checkIsPrivate(vid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.checkIfPrivate(connection, vid);
    connection.release();
  
    return getResult[0].isPrivate;
};


export async function getWriterID(vid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.getWriterID(connection, vid);
    connection.release();
  
    return getResult[0].userID;
};

export async function getReviewList(eid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.getReviewList(connection, eid);
    connection.release();
  
    return getResult;
};