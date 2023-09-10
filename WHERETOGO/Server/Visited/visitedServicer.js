import pool from "../config/database.js";
import logger from "../config/winston.js";
import secret_config from '../config/secret.js';

import * as visitedProvider from "./visitedProvider.js";
import * as visitedDao from "./visitedDao.js";
import * as baseResponse from "../config/baseResponseStatus.js";
import {response, errResponse} from "../config/response.js";

import jwt from "jsonwebtoken";

import crypto from "crypto";
import connect from "http2";

export async function insertVisited(eid, uid, star, companionID, picList, review, isPrivate) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const putVisitedEvent = await visitedDao.insertVisitedEvent(connection, uid, eid, star, companionID, picList, review, isPrivate);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - insertVisited Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


export async function deleteVisited(eid, uid) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteVisitedEvent = await visitedDao.deleteVisitedEvent(connection, uid, eid);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteVisited Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};