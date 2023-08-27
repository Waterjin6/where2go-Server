import jwtMiddleware from "../config/jwtMiddleware.js";
import * as userProvider from "./userProvider.js";
import * as userServicer from "./userServicer.js";
import * as baseResponse from "../config/baseResponseStatus.js";
import regexEmail from "regex-email";

import {response, errResponse} from "../config/response.js";

export async function patchUsersNickName(req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userIdx;

    const uid = req.params.userIdx;
    const nickName = req.body.nickName;

    if (!uid) return res.send(errResponse(baseResponse.USER_IDX_EMPTY));

    if (!nickName)
        return res.send(response(baseResponse.USER_NICKNAME_EMPTY));
    
    if (userIdFromJWT != uid) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const editUserInfoNickName = await userServicer.editUserNN(uid, nickName);
        return res.send(editUserInfoNickName);
    }
};


export async function loginUser (req, res) {

    const {email, password} = req.body;

    if(!email)return res.send(errResponse(baseResponse.USER_USEREMAIL_EMPTY));
    if(!password)return res.send(errResponse(baseResponse.USER_PASSWORD_EMPTY));

    const signInResponse = await userServicer.postSignIn(email, password);

    return res.send(signInResponse);
};

export async function registerUser (req, res) {

    const {email, password, nickName, age, sex} = req.body;
    if(!email)return res.send(errResponse(baseResponse.USER_USEREMAIL_EMPTY));
    if(!password)return res.send(errResponse(baseResponse.USER_PASSWORD_EMPTY));
    if(!nickName)return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
    
    if(!regexEmail.test(email)) return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    const signUpResponse = await userServicer.createUser(
        email, 
        password,
        nickName,
        age,
        sex
    );

    return res.send(signUpResponse);

};