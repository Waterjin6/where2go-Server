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

  export async function passwordCheck (selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectUserPassword(
        connection,
        selectUserPasswordParams
    );
    connection.release();
    return passwordCheckResult[0];
  };