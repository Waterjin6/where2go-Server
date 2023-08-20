import jwtMiddleware from "../config/jwtMiddleware.js";
const userProvider = "./userProvider.js";
const userServicer = "./userServicer.js";
const baseResponse = "../config/baseResponseStatus.js";
import regexEmail from "regex-email";

import {response, errResponse} from "../config/response.js";

export const loginUser = async function(req, res) {

    const {email, password} = req.body;

    if(!email)return res.send(errResponse(baseResponse.USER_USEREMAIL_EMPTY));
    if(!password)return res.send(errResponse(baseResponse.USER_PASSWORD_EMPTY));

    const signInResponse = await userServicer.postSignIn(email, password);

    return res.send(signInResponse);
};

export const registerUser = async function(req, res) {

    var {email, password, nickName, age, sex} = req.body;
    if(!email)return res.send(errResponse(baseResponse.USER_USEREMAIL_EMPTY));
    if(!password)return res.send(errResponse(baseResponse.USER_PASSWORD_EMPTY));
    if(!nickName)return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
    if(!age) age = -1;
    if(!sex) sex = "d";

    if (!regexEmail.test(email)) return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    const signUpResponse = await userServicer.createUser(
        email,
        password,
        nickName,
        age,
        sex
    );    
    return res.send(signUpResponse);

};