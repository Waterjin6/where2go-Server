import pool from "../config/database.js";
import logger from "../config/winston.js";
import secret_config from '../config/secret.js';

import * as userProvider from "./userProvider.js";
import * as userDao from "./userDao.js";
import * as baseResponse from "../config/baseResponseStatus.js";
import {response, errResponse} from "../config/response.js";

import jwt from "jsonwebtoken";

import crypto from "crypto";
import connect from "http2";

export async function createUser (email, password, nickName, age, sex) {
    try {

        // 이메일 중복 확인
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows != undefined)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [email, hashedPassword, nickName, age, sex];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUser(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`);
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

export async function postSignIn (email, password) {
    try {
        // 이메일 여부 확인
        const emailRows = await userProvider.emailCheck(email);
        
        if (emailRows == undefined) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

        const selectEmail = emailRows.email

    

        // 비밀번호 확인
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");
        
        const selectUserPasswordParams = [selectEmail, hashedPassword];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);
       

        if (passwordRows[0] == undefined) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(email);

        console.log(userInfoRows[0].userID) // DB의 userId

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userIdx: userInfoRows[0].userIdx,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "1d",
                subject: "userInfo",
            } // 유효 기간 1일
        );

        return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].userIdx, 'jwt': token});

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
