
import * as areaProvider from "./areaProvider.js";
import * as areaServicer from "./areaServicer.js";
import * as baseResponse from "../config/baseResponseStatus.js";

import {response, errResponse} from "../config/response.js";

export async function getBigName (req, res) {
    const areacode = req.params.areacode;

    if(!areacode) return res.send(errResponse(baseResponse.AREACODE_EMPTY));
    
    const getBigNameResults = await areaProvider.getBigContent(areacode);

    if(!getBigNameResults) return res.send(errResponse(baseResponse.BIG_AREACODE_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, getBigNameResults));
}

export async function getSmallName (req, res) {
    const bigarea = req.params.bigarea;
    const smallarea = req.params.smallarea;

    if(!bigarea) return res.send(errResponse(baseResponse.BIG_AREACODE_EMPTY));
    if(!smallarea) return res.send(errResponse(baseResponse.SMALL_AREACODE_EMPTY));
    
    const getSmallNameResults = await areaProvider.getSmallContent(bigarea, smallarea);

    if(!getSmallNameResults) return res.send(errResponse(baseResponse.SMALL_AREACODE_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, getSmallNameResults));
}
export async function patchUsersNickName(req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userIdx;

    const nickName = req.body.nickName;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    if (!nickName)
        return res.send(response(baseResponse.USER_NICKNAME_EMPTY));
    
    const editUserInfoNickName = await userServicer.editUserNN(userIdFromJWT, nickName);
    return res.send(editUserInfoNickName);
};

export async function patchUsersPw(req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userIdx;

    const password = req.body.password;


    if (!password)
        return res.send(response(baseResponse.USER_PASSWORD_EMPTY));
    
    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));
    
    const editUserInfoPW = await userServicer.editUserPW(userIdFromJWT, password);
    return res.send(editUserInfoPW);

};

export async function loginUser (req, res) {

    const {email, password} = req.body;

    if(!email)return res.send(errResponse(baseResponse.USER_USEREMAIL_EMPTY));
    if(!password)return res.send(errResponse(baseResponse.USER_PASSWORD_EMPTY));

    const signInResponse = await userServicer.postSignIn(email, password);

    return res.send(signInResponse);
};

export async function registerUser (req, res) {

    var {email, password, nickName, age, sex} = req.body;
    if(!email)return res.send(errResponse(baseResponse.USER_USEREMAIL_EMPTY));
    if(!password)return res.send(errResponse(baseResponse.USER_PASSWORD_EMPTY));
    if(!nickName)return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));
    if(!age) age = -1;
    if(!sex) sex = "d";
    
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

export async function deleteUser (req, res) {

    // jwt - userId, path variable :userId
    
    const userIdFromJWT = req.verifiedToken.userIdx;

        
    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    const unregisterUser = await userServicer.unregisterUser(userIdFromJWT);
    return res.send(unregisterUser);
};

export async function getUserPW(req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userIdx;

    const password = req.body.password;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    if (!password)
        return res.send(response(baseResponse.USER_PASSWORD_EMPTY));
    
    
    const getUserInfoPW = await userServicer.checkUserPW(userIdFromJWT, password);
    return res.send(getUserInfoPW);
};

export async function getUserNN(req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));
    
    
    const getUserInfoNN = await userProvider.getUserNN(userIdFromJWT);
    if(getUserInfoNN.nickName == undefined) return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST)); 

    return res.send(response(baseResponse.SUCCESS, getUserInfoNN));
};