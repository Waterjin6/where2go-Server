import pool from "../config/database.js";
import logger from "../config/winston.js";

import * as userDao from "./userDao.js";

export async function emailCheck (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await userDao.selectUserEmail(connection, email);
    connection.release();
  
    return emailCheckResult[0];
  };

  export async function accountCheck (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userAccountResult = await userDao.selectUserAccount(connection, email);
    connection.release();
  
    return userAccountResult;
  };

  export async function userExistCheck (uid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userIDResult = await userDao.selectUserID(connection, uid);
    connection.release();
  
    return userIDResult;
  };

  export async function passwordCheck (selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectUserPassword(
        connection,
        selectUserPasswordParams
    );
    connection.release();
    return passwordCheckResult[0];
  };

  export async function checkPasswordBool (checkPWInfoParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.checkUserPassword(connection, checkPWInfoParams);
    connection.release();
  
    return passwordCheckResult[0].count;
  };

  export async function  getUserNN (uid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getUserNickNameResult = await userDao.getUserNickname(connection, uid);
    connection.release();
    return getUserNickNameResult[0];
  };

  export async function  getUserSexAge (uid) {
    const connection = await pool.getConnection(async (conn) => conn);
    const getUserSexAgeResult = await userDao.getUserSexAge(connection, uid);
    connection.release();
    return getUserSexAgeResult[0];
  };