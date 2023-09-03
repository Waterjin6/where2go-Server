import pool from "../config/database.js";
import logger from "../config/winston.js";
import secret_config from '../config/secret.js';

import * as savedProvider from "./savedProvider.js";
import * as savedDao from "./savedDao.js";
import * as baseResponse from "../config/baseResponseStatus.js";
import {response, errResponse} from "../config/response.js";

import jwt from "jsonwebtoken";

import crypto from "crypto";
import connect from "http2";

export async function insertSaved(eid, uid) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const putSavedEvent = await savedDao.insertSavedEvent(connection, uid, eid);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - insertSaved Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


export async function deleteSaved(eid, uid) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteSavedEvent = await savedDao.deleteSavedEvent(connection, uid, eid);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteSaved Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};