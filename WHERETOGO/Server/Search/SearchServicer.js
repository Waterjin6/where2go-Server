import pool from "../config/database.js";
import logger from "../config/winston.js";
import secret_config from '../config/secret.js';

import * as searchProvider from "./searchProvider.js";
import * as searchDao from "./searchDao.js";
import * as baseResponse from "../config/baseResponseStatus.js";
import {response, errResponse} from "../config/response.js";

import jwt from "jsonwebtoken";

import crypto from "crypto";
import connect from "http2";

export async function updateSearch(search) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const insertSearch = await searchDao.insertSearch(connection, search);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - insertSearch Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};