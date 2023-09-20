import pool from "../config/database.js";
import logger from "../config/winston.js";

import * as reviewProvider from "./reviewProvider.js";
import * as reviewDao from "./reviewDao.js";
import * as baseResponse from "../config/baseResponseStatus.js";
import {response, errResponse} from "../config/response.js";

import jwt from "jsonwebtoken";

import crypto from "crypto";
import connect from "http2";

export async function putReviewLike(uid, rid) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const insertReviewLike = await reviewDao.insertReviewLike(connection, uid, rid);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - insertReviewLike Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};