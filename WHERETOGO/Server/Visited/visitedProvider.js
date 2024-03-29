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

export async function getMAReview(vid, uid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.getMAReviewRow(connection, vid, uid);
    connection.release();
  
    return getResult;
};

export async function checkVisitedList(uid, eid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.checkVisitedEventRow(connection, uid, eid);
    connection.release();
  
    return getResult[0].isVisited;
};


export async function getVisitedID(uid, eid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.getVisitedIDRow(connection, uid, eid);
    connection.release();
  
    return getResult[0];
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

export async function getReviewList(eid, align) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.getReviewList(connection, eid, align);
    connection.release();
  
    return getResult;
};


export async function getCompanionRate(eid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.getComVisitInfo(connection, eid);
    connection.release();
  
    return getResult;
};


export async function getCompanionStar(eid, cid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.getComStarInfo(connection, eid, cid);
    connection.release();
  
    return getResult;
};


export async function getMReviewList(eid, uid, align) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getResult = await visitedDao.getMReviewList(connection, eid, uid, align);
    connection.release();
  
    return getResult;
};