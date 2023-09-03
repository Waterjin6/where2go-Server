import pool from "../config/database.js";
import logger from "../config/winston.js";
import secret_config from '../config/secret.js';

import * as keywordProvider from "./keywordProvider.js";
import * as keywordDao from "./keywordDao.js";
import * as baseResponse from "../config/baseResponseStatus.js";
import {response, errResponse} from "../config/response.js";

import jwt from "jsonwebtoken";

import crypto from "crypto";
import connect from "http2";

export async function insertKeyword(uid, keyword) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const putKeyword = await keywordDao.insertKeyword(connection, uid, keyword);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - insertKeyword Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


export async function deleteKeyword(uid, keyword) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteKeyword = await keywordDao.deleteKeyword(connection, uid, keyword);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteKeyword Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};