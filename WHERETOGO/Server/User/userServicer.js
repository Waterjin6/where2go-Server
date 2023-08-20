import pool from "../config/database.js";
import logger from "../config/winston.js";
import secret_config from '../config/secret.js';

const userProvider = "./userProvider";
const userDao = "./userDao";
const baseResponse = "../config/baseResponseStatus.js";
import {response, errResponse} from "../config/response.js";

import jwt from "jsonwebtoken";

import crypto from "crypto";
import connect from "http2";

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

        console.log(userInfoRows[0].userIdx) // DB의 userId

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
